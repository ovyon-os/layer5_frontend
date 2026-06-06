import type { OvyonOS } from "../types";

export interface InputText {
  id: string;
  name: string;
  icon?: string;
  initial?: string;
  min?: number;
  max?: number;
  pattern?: string;
  mode?: "text" | "password";
}

export interface InputTextMutableParams {
  name: string;
  icon: string;
  initial: string;
  min: number;
  max: number;
  pattern: string;
  mode: "text" | "password";
}

export const setValue = (hass: OvyonOS, entity: string, value: string) =>
  hass.callService(entity.split(".", 1)[0], "set_value", {
    value,
    entity_id: entity,
  });

export const fetchInputText = (hass: OvyonOS) =>
  hass.callWS<InputText[]>({ type: "input_text/list" });

export const createInputText = (
  hass: OvyonOS,
  values: InputTextMutableParams
) =>
  hass.callWS<InputText>({
    type: "input_text/create",
    ...values,
  });

export const updateInputText = (
  hass: OvyonOS,
  id: string,
  updates: Partial<InputTextMutableParams>
) =>
  hass.callWS<InputText>({
    type: "input_text/update",
    input_text_id: id,
    ...updates,
  });

export const deleteInputText = (hass: OvyonOS, id: string) =>
  hass.callWS({
    type: "input_text/delete",
    input_text_id: id,
  });
