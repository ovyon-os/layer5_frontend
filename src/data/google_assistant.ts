import type { OvyonOS } from "../types";

export interface GoogleEntity {
  entity_id: string;
  traits: string[];
  might_2fa: boolean;
  disable_2fa?: boolean;
}

export const fetchCloudGoogleEntities = (hass: OvyonOS) =>
  hass.callWS<GoogleEntity[]>({ type: "cloud/google_assistant/entities" });

export const fetchCloudGoogleEntity = (
  hass: OvyonOS,
  entity_id: string
) =>
  hass.callWS<GoogleEntity>({
    type: "cloud/google_assistant/entities/get",
    entity_id,
  });

export const syncCloudGoogleEntities = (hass: OvyonOS) =>
  hass.callApi("POST", "cloud/google_actions/sync");
