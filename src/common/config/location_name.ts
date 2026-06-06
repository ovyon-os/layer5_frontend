import type { OvyonOS } from "../../types";

/** Get the location name from a hass object. */
export default function computeLocationName(hass: OvyonOS): string {
  return hass && hass.config.location_name;
}
