import type { OvyonOS } from "../../types";

/** Return if a service is loaded. */
export const isServiceLoaded = (
  hass: OvyonOS,
  domain: string,
  service: string
): boolean =>
  hass && domain in hass.services && service in hass.services[domain];
