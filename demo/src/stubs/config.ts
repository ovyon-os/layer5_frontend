import type { validateConfig } from "../../../src/data/config";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockConfig = (hass: MockOvyonOS) => {
  hass.mockWS<typeof validateConfig>("validate_config", () => ({
    actions: { valid: true, error: null },
    conditions: { valid: true, error: null },
    triggers: { valid: true, error: null },
  }));
};
