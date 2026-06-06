import type { OvyonOS } from "../types";

export interface InputButton {
  id: string;
  name: string;
  icon?: string;
}

export interface InputButtonMutableParams {
  name: string;
  icon: string;
}

export const fetchInputButton = (hass: OvyonOS) =>
  hass.callWS<InputButton[]>({ type: "input_button/list" });

export const createInputButton = (
  hass: OvyonOS,
  values: InputButtonMutableParams
) =>
  hass.callWS<InputButton>({
    type: "input_button/create",
    ...values,
  });

export const updateInputButton = (
  hass: OvyonOS,
  id: string,
  updates: Partial<InputButtonMutableParams>
) =>
  hass.callWS<InputButton>({
    type: "input_button/update",
    input_button_id: id,
    ...updates,
  });

export const deleteInputButton = (hass: OvyonOS, id: string) =>
  hass.callWS({
    type: "input_button/delete",
    input_button_id: id,
  });
