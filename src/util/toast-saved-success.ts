import type { OvyonOS } from "../types";
import { showToast } from "./toast";

export const showSaveSuccessToast = (el: HTMLElement, hass: OvyonOS) =>
  showToast(el, {
    message: hass!.localize("ui.common.successfully_saved"),
  });
