import type { DemoConfig } from "../types";
import { demoEntitiesSections } from "./entities";
import { demoLovelaceSections } from "./lovelace";

export const demoSections: DemoConfig = {
  authorName: "OVYON OS",
  authorUrl: "https://github.com/ovyon/frontend/",
  name: "Home Demo",
  lovelace: demoLovelaceSections,
  entities: demoEntitiesSections,
  theme: () => ({}),
};
