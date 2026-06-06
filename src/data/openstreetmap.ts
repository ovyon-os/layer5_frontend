import type { OvyonOS } from "../types";

export interface OpenStreetMapPlace {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string | null;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    city?: string;
    municipality?: string;
    state?: string;
    country?: string;
    postcode?: string;
    country_code: string;
    [key: string]: string | undefined;
  };
  boundingbox: number[];
}

export const searchPlaces = (
  address: string,
  hass: OvyonOS,
  addressdetails?: boolean,
  limit?: number
): Promise<OpenStreetMapPlace[]> =>
  fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2${
      limit ? `&limit=${limit}` : ""
    }${addressdetails ? "&addressdetails=1" : ""}&accept-language=${
      hass.locale.language
    }&email=abuse@ovyon.io`,
    { headers: { "User-Agent": `OvyonOS/${hass.config.version}` } }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

export const reverseGeocode = (
  location: [number, number],
  hass: OvyonOS,
  zoom?: number
): Promise<OpenStreetMapPlace> =>
  fetch(
    `https://nominatim.openstreetmap.org/reverse.php?lat=${location[0]}&lon=${
      location[1]
    }&accept-language=${hass.locale.language}&zoom=${
      zoom ?? 18
    }&format=jsonv2&email=abuse@ovyon.io`,
    { headers: { "User-Agent": `OvyonOS/${hass.config.version}` } }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
