import type { OvyonOS } from "../types";
import { isSafari } from "./is_safari";

export const isIosApp = (
  authExternal: OvyonOS["auth"]["external"]
): boolean => !!authExternal && isSafari;
