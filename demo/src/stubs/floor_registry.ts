import type { FloorRegistryEntry } from "../../../src/data/floor_registry";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockFloorRegistry = (
  hass: MockOvyonOS,
  data: FloorRegistryEntry[] = []
) => hass.mockWS("config/floor_registry/list", () => data);
