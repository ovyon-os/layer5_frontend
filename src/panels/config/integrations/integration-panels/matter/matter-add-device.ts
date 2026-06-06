/* eslint-disable lit/lifecycle-super */
import { customElement } from "lit/decorators";
import { navigate } from "../../../../../common/navigate";
import type { OvyonOS } from "../../../../../types";
import { showMatterAddDeviceDialog } from "./show-dialog-add-matter-device";

@customElement("matter-add-device")
export class MatterAddDevice extends HTMLElement {
  public hass!: OvyonOS;

  connectedCallback() {
    navigate("/config/devices/dashboard", {
      replace: true,
    });
    showMatterAddDeviceDialog(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "matter-add-device": MatterAddDevice;
  }
}
