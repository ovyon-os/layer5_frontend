import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockSystemLog = (hass: MockOvyonOS) => {
  hass.mockAPI("error/all", () => []);
};
