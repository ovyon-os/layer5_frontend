import type { AreaRegistryEntry } from "../../../data/area/area_registry";
import type { FloorRegistryEntry } from "../../../data/floor_registry";
import type { OvyonOS } from "../../../types";

interface AreaContext {
  area: AreaRegistryEntry | null;
  floor: FloorRegistryEntry | null;
}
export const getAreaContext = (
  area: AreaRegistryEntry,
  hassFloors: OvyonOS["floors"]
): AreaContext => {
  const floorId = area.floor_id;
  const floor = floorId ? hassFloors[floorId] : undefined;

  return {
    area: area,
    floor: floor || null,
  };
};
