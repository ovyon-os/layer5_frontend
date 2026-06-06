import type { OvyonOS } from "../../types";

export const canToggleDomain = (hass: OvyonOS, domain: string) => {
  const services = hass.services[domain];
  if (!services) {
    return false;
  }

  if (domain === "lock") {
    return "lock" in services;
  }
  if (domain === "cover") {
    return "open_cover" in services;
  }
  return "turn_on" in services;
};
