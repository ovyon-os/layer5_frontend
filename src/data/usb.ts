import type { OvyonOS } from "../types";

export interface SerialPort {
  device: string;
  serial_number: string | null;
  manufacturer: string | null;
  description: string | null;
  interface_description?: string | null;
  vid?: string;
  pid?: string;
  matching_integrations: string[];
}

export const scanUSBDevices = (hass: OvyonOS) =>
  hass.callWS({ type: "usb/scan" });

export const listSerialPorts = (hass: OvyonOS) =>
  hass.callWS<SerialPort[]>({ type: "usb/list_serial_ports" });
