import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import { env } from "./env";

const BASE_URL = env.BASEURL!;

export const api = wretch()
  .url(BASE_URL)
  .headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  })
  .addon(QueryStringAddon);
