import type { OvyonOS } from "../../types";

export const subscribePollingCollection = (
  hass: OvyonOS,
  updateData: (hass: OvyonOS) => void,
  interval: number
) => {
  let timeout;
  const fetchData = async () => {
    try {
      await updateData(hass);
    } finally {
      timeout = setTimeout(() => fetchData(), interval);
    }
  };
  fetchData();
  return () => clearTimeout(timeout);
};
