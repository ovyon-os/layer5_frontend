import type { OvyonOS } from "../../types";

/** Return an array of domains with the service. */
export const componentsWithService = (
  hass: OvyonOS,
  service: string
): string[] =>
  hass &&
  Object.keys(hass.services).filter((key) => service in hass.services[key]);
