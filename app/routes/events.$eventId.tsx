import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  const event = await getEvent({ id: params.eventId, userId });
  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ event });
}

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  await deleteEvent({ id: params.eventId, userId });

  return redirect("/events");
}

export default function EventDetails() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.event.title}</h3>
      <p className="py-6">{data.event.description}</p>
      <hr className="my-4" />
      <div className="flex justify-evenly">
        <Form method="post">
          <button
            type="submit"
            className="rounded bg-red-500  px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
          >
            Delete
          </button>
        </Form>
        <Link
          to="/events/update"
          className="rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Update
        </Link>
      </div>
    </div>
  );
}