import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockAuth = (hass: MockOvyonOS) => {
  hass.mockWS("config/auth/list", () => []);
  hass.mockWS("auth/refresh_tokens", () => []);
};
