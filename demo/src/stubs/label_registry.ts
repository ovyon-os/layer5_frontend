import type { LabelRegistryEntry } from "../../../src/data/label/label_registry";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockLabelRegistry = (
  hass: MockOvyonOS,
  data: LabelRegistryEntry[] = []
) => hass.mockWS("config/label_registry/list", () => data);
