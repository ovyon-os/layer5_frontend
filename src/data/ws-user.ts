import type { Connection } from "ovyon-js-websocket";
import { getCollection, getUser } from "ovyon-js-websocket";
import type { CurrentUser } from "../types";

export const userCollection = (conn: Connection) =>
  getCollection(
    conn,
    "_usr",
    () => getUser(conn) as Promise<CurrentUser>,
    undefined
  );

export const subscribeUser = (
  conn: Connection,
  onChange: (user: CurrentUser) => void
) => userCollection(conn).subscribe(onChange);
