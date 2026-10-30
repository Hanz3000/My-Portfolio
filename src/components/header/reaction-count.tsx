"use client";

import { Heart } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  getReactionCount,
  getServerReactionCount,
  subscribeToReactionCount,
} from "@/lib/reaction-count";

export default function ReactionCount() {
  const count = useSyncExternalStore(
    subscribeToReactionCount,
    getReactionCount,
    getServerReactionCount
  );

  return (
    <div
      className="mr-4 inline-flex h-10 items-center gap-2 rounded-lg border-2 border-black/30 px-3 text-sm font-medium dark:border-white/30"
      title="Jumlah reaksi emoji dari semua pengunjung"
      aria-label={`${count.toLocaleString("id-ID")} reaksi dari semua pengunjung`}
      role="status"
      aria-live="polite"
    >
      <Heart
        size={18}
        className="fill-rose-500 text-rose-500"
        aria-hidden="true"
      />
      <span>{count.toLocaleString("id-ID")}</span>
    </div>
  );
}
