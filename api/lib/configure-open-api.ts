import { AppOpenAPI } from "./types";
import packageJson from "../../package.json";
import { apiReference } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Hono API",
      version: packageJson.version,
    },
  });

  app.get(
    "/reference",
    apiReference({
      spec: {
        url: "/api/doc",
      },
      theme: "kepler",
      layout: "classic",
    })
  );
}
