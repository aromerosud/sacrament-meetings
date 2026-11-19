"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getSnapshot() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function getServerSnapshot() {
  return "";
}

export default function HeaderDate() {
  const formattedDate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return <p className="text-sm text-blue-100">{formattedDate}</p>;
}
