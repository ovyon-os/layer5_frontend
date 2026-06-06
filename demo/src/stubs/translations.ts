import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockTranslations = (hass: MockOvyonOS) => {
  hass.mockWS(
    "frontend/get_translations",
    (/* msg: {language: string, category: string} */) => ({ resources: {} })
  );
};
