import type { HassEntity } from "ovyon-js-websocket";
import { LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import type { OvyonOS } from "../../../types";

@customElement("more-info-default")
class MoreInfoDefault extends LitElement {
  @property({ attribute: false }) public hass!: OvyonOS;

  @property({ attribute: false }) public stateObj?: HassEntity;

  protected render() {
    if (!this.hass || !this.stateObj) {
      return nothing;
    }

    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "more-info-default": MoreInfoDefault;
  }
}
