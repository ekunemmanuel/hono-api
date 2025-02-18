import { createRouter } from "../lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";

const router = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          message: z.string().default("Hello, World!"),
        }),
        "The response message"
      ),
    },
    tags: ["Index"],
  }),
  (c) => c.json({ message: "Hello, World!" })
);

export default router;

// 0TP26COHsCdxi0v0