import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockEvents = (hass: MockOvyonOS) => {
  hass.mockAPI("events", () => []);
};
