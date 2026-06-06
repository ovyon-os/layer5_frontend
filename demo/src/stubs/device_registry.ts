import type { DeviceRegistryEntry } from "../../../src/data/device/device_registry";
import type { MockOvyonOS } from "../../../src/fake_data/provide_hass";

export const mockDeviceRegistry = (
  hass: MockOvyonOS,
  data: DeviceRegistryEntry[] = []
) => {
  hass.mockWS("config/device_registry/list", () => data);
  const devices = {};
  data.forEach((device) => {
    devices[device.id] = device;
  });
  hass.updateHass({ devices });
};
