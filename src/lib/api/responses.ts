import { StatusCodes } from "http-status-codes";

export const notAuthorised = () =>
  new Response("Not authorised", {
    status: StatusCodes.BAD_REQUEST,
  });
export const badRequest = (message: string) =>
  new Response(message, {
    status: StatusCodes.BAD_REQUEST,
  });
export const created = (item: BodyInit | null) =>
  new Response(item, {
    status: StatusCodes.CREATED,
  });
