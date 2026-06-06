import type { OvyonOS, ThemeSettings } from "../types";
import { saveFrontendUserData, subscribeFrontendUserData } from "./frontend";

declare global {
  interface FrontendUserData {
    theme: ThemeSettings;
  }
}

export const subscribeThemePreferences = (
  hass: OvyonOS,
  callback: (data: { value: ThemeSettings | null }) => void
) => subscribeFrontendUserData(hass.connection, "theme", callback);

export const saveThemePreferences = (
  hass: OvyonOS,
  data: ThemeSettings
) => saveFrontendUserData(hass.connection, "theme", data);
