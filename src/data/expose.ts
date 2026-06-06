import type { OvyonOS } from "../types";
import type { EntityRegistryEntry } from "./entity/entity_registry";
import { entityRegistryByEntityId } from "./entity/entity_registry";

export const voiceAssistants = {
  conversation: { domain: "assist_pipeline", name: "Assist" },
  "cloud.alexa": {
    domain: "alexa",
    name: "Amazon Alexa",
  },
  "cloud.google_assistant": {
    domain: "google_assistant",
    name: "Google Assistant",
  },
} as const;

export interface ExposeEntitySettings {
  conversation?: boolean;
  "cloud.alexa"?: boolean;
  "cloud.google_assistant"?: boolean;
}

export const setExposeNewEntities = (
  hass: OvyonOS,
  assistant: string,
  expose_new: boolean
) =>
  hass.callWS({
    type: "OvyonOS/expose_new_entities/set",
    assistant,
    expose_new,
  });

export const getExposeNewEntities = (hass: OvyonOS, assistant: string) =>
  hass.callWS<{ expose_new: boolean }>({
    type: "OvyonOS/expose_new_entities/get",
    assistant,
  });

export const exposeEntities = (
  hass: OvyonOS,
  assistants: string[],
  entity_ids: string[],
  should_expose: boolean
) =>
  hass.callWS({
    type: "OvyonOS/expose_entity",
    assistants,
    entity_ids,
    should_expose,
  });

export const listExposedEntities = (hass: OvyonOS) =>
  hass.callWS<{ exposed_entities: Record<string, ExposeEntitySettings> }>({
    type: "OvyonOS/expose_entity/list",
  });

export const getEntityVoiceAssistantsIds = (
  entityRegistry: EntityRegistryEntry[],
  entityId: string
) => {
  const entity = entityRegistryByEntityId(entityRegistry)[entityId];
  return Object.keys(voiceAssistants).filter(
    (vaKey) => entity?.options?.[vaKey]?.should_expose
  );
};
