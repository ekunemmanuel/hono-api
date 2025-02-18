import { createRouter } from "@/lib/create-app";
import * as route from "./tasks.route";
import * as handler from "./tasks.handler";

const router = createRouter()
  .openapi(route.list, handler.list)
  .openapi(route.create, handler.create)
  .openapi(route.getOne, handler.getOne)
  .openapi(route.update, handler.update)
  .openapi(route.remove, handler.remove);

export default router;
