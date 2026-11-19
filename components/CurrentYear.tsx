"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getSnapshot() {
  return new Date().getFullYear();
}

function getServerSnapshot() {
  return 0;
}

export default function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <>{year === 0 ? "" : year}</>;
}
