import { subscribeOne } from "../../../common/util/subscribe-one";
import { subscribeAreaRegistry } from "../../../data/area/area_registry";
import type { AreaRegistryEntry } from "../../../data/area/area_registry";
import { fetchCategoryRegistry } from "../../../data/category_registry";
import {
  subscribeEntityRegistry,
  type EntityRegistryEntry,
} from "../../../data/entity/entity_registry";
import { subscribeFloorRegistry } from "../../../data/ws-floor_registry";
import type { FloorRegistryEntry } from "../../../data/floor_registry";
import { subscribeLabelRegistry } from "../../../data/label/label_registry";
import type { OvyonOS } from "../../../types";
import type { MetadataSuggestionDomain } from "./suggest-metadata-ai";

export type Categories = Record<string, string>;
export type Entities = Record<string, EntityRegistryEntry>;
export type Labels = Record<string, string>;
export type Floors = Record<string, FloorRegistryEntry>;
export type Areas = Record<string, AreaRegistryEntry>;

const tryCatchEmptyObject = <T>(promise: Promise<T>): Promise<T> =>
  promise.catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error fetching data for suggestion: ", err);
    return {} as T;
  });

export const fetchCategories = (
  connection: OvyonOS["connection"],
  domain: MetadataSuggestionDomain
): Promise<Categories> =>
  tryCatchEmptyObject<Categories>(
    fetchCategoryRegistry(connection, domain).then((cats) =>
      Object.fromEntries(cats.map((cat) => [cat.category_id, cat.name]))
    )
  );

export const fetchLabels = (
  connection: OvyonOS["connection"]
): Promise<Labels> =>
  tryCatchEmptyObject<Labels>(
    subscribeOne(connection, subscribeLabelRegistry).then((labs) =>
      Object.fromEntries(labs.map((lab) => [lab.label_id, lab.name]))
    )
  );

export const fetchFloors = (
  connection: OvyonOS["connection"]
): Promise<Floors> =>
  tryCatchEmptyObject<Floors>(
    subscribeOne(connection, subscribeFloorRegistry).then((floors) =>
      Object.fromEntries(floors.map((floor) => [floor.floor_id, floor]))
    )
  );

export const fetchAreas = (
  connection: OvyonOS["connection"]
): Promise<Areas> =>
  tryCatchEmptyObject<Areas>(
    subscribeOne(connection, subscribeAreaRegistry).then((areas) =>
      Object.fromEntries(areas.map((area) => [area.area_id, area]))
    )
  );

export const fetchEntities = (
  connection: OvyonOS["connection"]
): Promise<Entities> =>
  tryCatchEmptyObject<Entities>(
    subscribeOne(connection, subscribeEntityRegistry).then((ents) =>
      Object.fromEntries(ents.map((ent) => [ent.entity_id, ent]))
    )
  );
