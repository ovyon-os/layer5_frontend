import type { EntityRegistryEntry } from "../../../src/data/entity/entity_registry";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockEntityRegistry = (
  hass: MockOvyonOS,
  data: EntityRegistryEntry[] = []
) => {
  hass.mockWS("config/entity_registry/list", () => data);
};
