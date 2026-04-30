"use client";

import dynamic from "next/dynamic";

export const FloatingShardsLazy = dynamic(
  () => import("./floating-shards").then((m) => m.FloatingShards),
  { ssr: false, loading: () => null }
);
