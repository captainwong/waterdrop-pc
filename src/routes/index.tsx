import { NotFound } from "@/pages/404/NotFound";
import { Home } from "@/pages/home";
import { My } from "@/pages/my/My";
import { ROUTE_KEYS } from "./menu";

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.HOME]: Home,
  [ROUTE_KEYS.NOT_FOUND]: NotFound,
  [ROUTE_KEYS.MY]: My,
};
