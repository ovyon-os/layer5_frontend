import type { Auth, Connection } from "ovyon-js-websocket";
import { LitElement } from "lit";
import { property } from "lit/decorators";
import type { OvyonOS } from "../types";

export class HassBaseEl extends LitElement {
  @property({ attribute: false }) public hass?: OvyonOS;

  protected _pendingHass: Partial<OvyonOS> = {};

  // eslint-disable-next-line: variable-name
  private __provideHass: HTMLElement[] = [];

  public provideHass(el) {
    this.__provideHass.push(el);
    el.hass = this.hass;
  }

  protected initializeHass(_auth: Auth, _conn: Connection) {
    // implemented in connection-mixin
  }

  // Exists so all methods can safely call super method
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected hassConnected() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected hassReconnected() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected hassDisconnected() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected panelUrlChanged(_newPanelUrl) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected checkDataBaseMigration() {}

  protected hassChanged(hass, _oldHass) {
    this.__provideHass.forEach((el) => {
      (el as any).hass = hass;
    });
  }

  protected _updateHass(obj: Partial<OvyonOS>) {
    if (!this.hass) {
      this._pendingHass = { ...this._pendingHass, ...obj };
      return;
    }
    this.hass = { ...this.hass, ...obj };
  }
}
