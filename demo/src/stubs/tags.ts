import type { Tag } from "../../../src/data/tag";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockTags = (hass: MockOvyonOS) => {
  hass.mockWS("tag/list", () => [{ id: "my-tag", name: "My Tag" }] as Tag[]);
};
