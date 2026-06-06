import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockMediaPlayer = (hass: MockOvyonOS) => {
  hass.mockWS("media_player_thumbnail", () => Promise.reject());
};
