import type { OvyonOS } from "../types";

export interface AnalyticsPreferences {
  base?: boolean;
  diagnostics?: boolean;
  usage?: boolean;
  statistics?: boolean;
  snapshots?: boolean;
}

export interface Analytics {
  preferences: AnalyticsPreferences;
}

export const getAnalyticsDetails = (hass: OvyonOS) =>
  hass.callWS<Analytics>({
    type: "analytics",
  });

export const setAnalyticsPreferences = (
  hass: OvyonOS,
  preferences: AnalyticsPreferences
) =>
  hass.callWS<AnalyticsPreferences>({
    type: "analytics/preferences",
    preferences,
  });
