import {
  CreateRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "./tasks.route";
import { AppHandler } from "@/lib/types";
import prisma from "../../../prisma";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const list: AppHandler<ListRoute> = async (c) => {
  const result = await prisma.task.findMany();
  return c.json(result);
};

export const create: AppHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const result = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      completed: task.completed,
    },
  });
  return c.json(result, HttpStatusCodes.CREATED);
};

export const update: AppHandler<UpdateRoute> = async (c) => {
  const task = c.req.valid("json");
  const { id } = c.req.valid("param");
  const result = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title: task.title,
      description: task.description,
      completed: task.completed,
    },
  });
  return c.json(result, HttpStatusCodes.OK);
};

export const remove: AppHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await prisma.task.delete({
    where: {
      id,
    },
  });
  return c.json(result, HttpStatusCodes.OK);
};

export const getOne: AppHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    return c.json({}, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(result, HttpStatusCodes.OK);
};
