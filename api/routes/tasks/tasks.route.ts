import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Tasks"];

const taskSchema = z.object({
  id: z.string(),
  title: z
    .string({
      message: "The title must be a string",
    })
    .min(3, {
      message: "The title must be at least 3 characters long",
    }),
  description: z.string().nullable().optional(),
  completed: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createTaskSchema = taskSchema
  .required({
    completed: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const updateTaskSchema = createTaskSchema.partial();

const IdParamsSchema = z.object({
  id: z.string().openapi({
    description: "The task ID",
    param: {
      name: "id",
      in: "path",
    },
    example: "67aa81d3e86c92f2761a6210",
  }),
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(taskSchema), "The list of tasks"),
  },
});

export const create = createRoute({
  path: "/tasks",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(createTaskSchema, "The task to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(taskSchema, "The created task"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(createTaskSchema),
      "The error message"
    ),
  },
});

export const update = createRoute({
  path: "/tasks/{id}",
  method: "put",
  tags,
  request: {
    body: jsonContentRequired(updateTaskSchema, "The task to update"),
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(taskSchema, "The updated task"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(updateTaskSchema),
      "The error message"
    ),
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContentRequired(
      taskSchema,
      "The task was deleted"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContentRequired(
      z.object({}),
      "The task was not found"
    ),
  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(taskSchema, "The task"),
    [HttpStatusCodes.NOT_FOUND]: jsonContentRequired(
      z.object({}),
      "The task was not found"
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
export type GetOneRoute = typeof getOne;
