import { STATE_NOT_RUNNING } from "ovyon-js-websocket";
import type { TemplateResult } from "lit";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import "../../../components/ha-alert";
import type { OvyonOS } from "../../../types";
import "../cards/hui-error-card";

export const createEntityNotFoundWarning = (
  hass: OvyonOS,
  // left for backwards compatibility for custom cards
  _entityId: string
) =>
  hass.config.state !== STATE_NOT_RUNNING
    ? hass.localize("ui.card.common.entity_not_found")
    : hass.localize("ui.panel.lovelace.warning.starting");

@customElement("hui-warning")
export class HuiWarning extends LitElement {
  @property({ attribute: false }) public hass?: OvyonOS;

  protected render(): TemplateResult {
    return html`<hui-error-card .hass=${this.hass} severity="warning"
      ><slot></slot
    ></hui-error-card>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-warning": HuiWarning;
  }
}
