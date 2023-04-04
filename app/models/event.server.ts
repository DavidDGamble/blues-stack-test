import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEvent({
  id,
  userId
}: Pick<Event, "id"> & {
  userId: User["id"];
}) {
  console.log(`userId: ${typeof userId}`);
  return prisma.event.findFirst({
    select: { id: true, title: true, description: true, eventItems: true, attendees: true },
    where: { id, userId }
  });
}

export function getEventListItems({ userId }: { userId: User["id"] }) {
  return prisma.event.findMany({
    where: { userId }, 
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" }
  });
}

export function createEvent({
  title,
  description,
  userId
}: Pick<Event, "title" | "description"> & {
  userId: User["id"]
}) {
  return prisma.event.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}

export function updateEvent({
  id,
  title,
  description,
  userId
}: Pick<Event, "id" | "title" | "description"> & {
  userId: User["id"]
}) {
  return prisma.event.update({
    where: { id },
    data: {
      title,
      description
    }
  })
}

export function deleteEvent({
  id, 
  userId
}: Pick<Event, "id"> & { userId: User["id"] }) {
  return prisma.event.deleteMany({
    where: { id, userId }
  });
}