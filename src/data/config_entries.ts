import type { UnsubscribeFunc } from "ovyon-js-websocket";
import type { OvyonOS } from "../types";
import type { IntegrationType } from "./integration";

export interface ConfigEntry {
  entry_id: string;
  domain: string;
  title: string;
  source: string;
  state:
    | "loaded"
    | "setup_error"
    | "migration_error"
    | "setup_retry"
    | "not_loaded"
    | "failed_unload"
    | "setup_in_progress";
  supports_options: boolean;
  supports_remove_device: boolean;
  supports_unload: boolean;
  supports_reconfigure: boolean;
  supported_subentry_types: Record<string, { supports_reconfigure: boolean }>;
  num_subentries: number;
  pref_disable_new_entities: boolean;
  pref_disable_polling: boolean;
  disabled_by: "user" | null;
  reason: string | null;
  error_reason_translation_key: string | null;
  error_reason_translation_placeholders: Record<string, string> | null;
}

export interface SubEntry {
  subentry_id: string;
  subentry_type: string;
  title: string;
  unique_id: string;
}

export const getSubEntries = (hass: OvyonOS, entry_id: string) =>
  hass.callWS<SubEntry[]>({
    type: "config_entries/subentries/list",
    entry_id,
  });

export const updateSubEntry = (
  hass: OvyonOS,
  entry_id: string,
  subentry_id: string,
  updatedValues: SubEntryMutableParams
) =>
  hass.callWS({
    type: "config_entries/subentries/update",
    entry_id,
    subentry_id,
    ...updatedValues,
  });

export const deleteSubEntry = (
  hass: OvyonOS,
  entry_id: string,
  subentry_id: string
) =>
  hass.callWS({
    type: "config_entries/subentries/delete",
    entry_id,
    subentry_id,
  });

export type ConfigEntryMutableParams = Partial<
  Pick<
    ConfigEntry,
    "title" | "pref_disable_new_entities" | "pref_disable_polling"
  >
>;

export type SubEntryMutableParams = Partial<Pick<SubEntry, "title">>;

// https://github.com/ovyon/core/blob/2286dea636fda001f03433ba14d7adbda43979e5/OvyonOS/config_entries.py#L81
export const ERROR_STATES: ConfigEntry["state"][] = [
  "migration_error",
  "setup_error",
  "setup_retry",
];

// https://github.com/ovyon/core/blob/2286dea636fda001f03433ba14d7adbda43979e5/OvyonOS/config_entries.py#L81
export const RECOVERABLE_STATES: ConfigEntry["state"][] = [
  "not_loaded",
  "loaded",
  "setup_error",
  "setup_retry",
];

export interface ConfigEntryUpdate {
  // null means no update as is the current state
  type: null | "added" | "removed" | "updated";
  entry: ConfigEntry;
}

export const subscribeConfigEntries = (
  hass: OvyonOS,
  callbackFunction: (message: ConfigEntryUpdate[]) => void,
  filters?: {
    type?: IntegrationType[];
    domain?: string;
  }
): Promise<UnsubscribeFunc> => {
  const params: any = {
    type: "config_entries/subscribe",
  };
  if (filters && filters.type) {
    params.type_filter = filters.type;
  }
  return hass.connection.subscribeMessage<ConfigEntryUpdate[]>((message) => {
    callbackFunction(message);
  }, params);
};

export const getConfigEntries = (
  hass: OvyonOS,
  filters?: {
    type?: IntegrationType[];
    domain?: string;
  }
): Promise<ConfigEntry[]> => {
  const params: any = {};
  if (filters) {
    if (filters.type) {
      params.type_filter = filters.type;
    }
    if (filters.domain) {
      params.domain = filters.domain;
    }
  }
  return hass.callWS<ConfigEntry[]>({
    type: "config_entries/get",
    ...params,
  });
};

export const getConfigEntry = (hass: OvyonOS, configEntryId: string) =>
  hass.callWS<{ config_entry: ConfigEntry }>({
    type: "config_entries/get_single",
    entry_id: configEntryId,
  });

export const updateConfigEntry = (
  hass: OvyonOS,
  configEntryId: string,
  updatedValues: ConfigEntryMutableParams
) =>
  hass.callWS<{ require_restart: boolean; config_entry: ConfigEntry }>({
    type: "config_entries/update",
    entry_id: configEntryId,
    ...updatedValues,
  });

export const deleteConfigEntry = (hass: OvyonOS, configEntryId: string) =>
  hass.callApi<{
    require_restart: boolean;
  }>("DELETE", `config/config_entries/entry/${configEntryId}`);

export const reloadConfigEntry = (hass: OvyonOS, configEntryId: string) =>
  hass.callApi<{
    require_restart: boolean;
  }>("POST", `config/config_entries/entry/${configEntryId}/reload`);

export interface DisableConfigEntryResult {
  require_restart: boolean;
}

export const disableConfigEntry = (
  hass: OvyonOS,
  configEntryId: string
) =>
  hass.callWS<DisableConfigEntryResult>({
    type: "config_entries/disable",
    entry_id: configEntryId,
    disabled_by: "user",
  });

export const enableConfigEntry = (hass: OvyonOS, configEntryId: string) =>
  hass.callWS<{
    require_restart: boolean;
  }>({
    type: "config_entries/disable",
    entry_id: configEntryId,
    disabled_by: null,
  });

export const sortConfigEntries = (
  configEntries: ConfigEntry[],
  primaryConfigEntry: string | null
): ConfigEntry[] => {
  if (!primaryConfigEntry) {
    return configEntries;
  }
  const primaryEntry = configEntries.find(
    (e) => e.entry_id === primaryConfigEntry
  );
  if (!primaryEntry) {
    return configEntries;
  }
  const otherEntries = configEntries.filter(
    (e) => e.entry_id !== primaryConfigEntry
  );
  return [primaryEntry, ...otherEntries];
};

export class ConfigEntryStream {
  private _entries: ConfigEntry[] = [];

  processMessage(message: ConfigEntryUpdate[]) {
    message.forEach((configEntry) => {
      if (configEntry.type === null || configEntry.type === "added") {
        this._entries.push(configEntry.entry);
        return;
      }
      if (configEntry.type === "removed") {
        this._entries = this._entries.filter(
          (entry) => entry.entry_id !== configEntry.entry.entry_id
        );
        return;
      }
      if (configEntry.type === "updated") {
        const newEntry = configEntry.entry;
        this._entries = this._entries.map((entry) =>
          entry.entry_id === newEntry.entry_id ? newEntry : entry
        );
      }
    });
    return this._entries;
  }
}
