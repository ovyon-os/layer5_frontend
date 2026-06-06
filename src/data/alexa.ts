import type { OvyonOS } from "../types";

export interface AlexaEntity {
  entity_id: string;
  display_categories: string[];
  interfaces: string[];
}

export const fetchCloudAlexaEntities = (hass: OvyonOS) =>
  hass.callWS<AlexaEntity[]>({ type: "cloud/alexa/entities" });

export const fetchCloudAlexaEntity = (hass: OvyonOS, entity_id: string) =>
  hass.callWS<AlexaEntity>({
    type: "cloud/alexa/entities/get",
    entity_id,
  });

export const syncCloudAlexaEntities = (hass: OvyonOS) =>
  hass.callWS({ type: "cloud/alexa/sync" });
