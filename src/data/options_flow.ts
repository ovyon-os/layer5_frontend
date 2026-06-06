import type { OvyonOS } from "../types";
import type { DataEntryFlowStep } from "./data_entry_flow";

export const createOptionsFlow = (hass: OvyonOS, handler: string) =>
  hass.callApi<DataEntryFlowStep>(
    "POST",
    "config/config_entries/options/flow",
    {
      handler,
    }
  );

export const fetchOptionsFlow = (hass: OvyonOS, flowId: string) =>
  hass.callApi<DataEntryFlowStep>(
    "GET",
    `config/config_entries/options/flow/${flowId}`
  );

export const handleOptionsFlowStep = (
  hass: OvyonOS,
  flowId: string,
  data: Record<string, any>
) =>
  hass.callApi<DataEntryFlowStep>(
    "POST",
    `config/config_entries/options/flow/${flowId}`,
    data
  );

export const deleteOptionsFlow = (hass: OvyonOS, flowId: string) =>
  hass.callApi("DELETE", `config/config_entries/options/flow/${flowId}`);
