import type { IconCategory } from "../../../src/data/icons";
import { ENTITY_COMPONENT_ICONS } from "../../../src/fake_data/entity_component_icons";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockIcons = (hass: MockOvyonOS) => {
  hass.mockWS(
    "frontend/get_icons",
    async ({
      category,
      integration,
    }: {
      category: IconCategory;
      integration?: string;
    }) => {
      if (integration) {
        try {
          const response = await fetch(
            `https://raw.githubusercontent.com/ovyon/core/dev/OvyonOS/components/${integration}/icons.json`
          ).then((resp) => resp.json());
          return { resources: { [integration]: response[category] || {} } };
        } catch {
          return { resources: {} };
        }
      }
      if (category === "entity_component") {
        return {
          resources: ENTITY_COMPONENT_ICONS,
        };
      }
      return { resources: {} };
    }
  );
};
