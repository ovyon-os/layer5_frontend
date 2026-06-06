import type { OvyonOS } from "../../types";

/** Return if a component is loaded. */
export const isComponentLoaded = (
  hassConfig: OvyonOS["config"],
  component: string
): boolean => hassConfig && hassConfig.components.includes(component);
