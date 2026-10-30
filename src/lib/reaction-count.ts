const listeners = new Set<() => void>();
let count = 0;
let eventSource: EventSource | null = null;
let hasReportedStreamError = false;

function updateReactionCount(nextCount: unknown) {
  if (
    typeof nextCount !== "number" ||
    !Number.isSafeInteger(nextCount) ||
    nextCount < 0
  ) {
    console.error("Received an invalid reaction count from the server.");
    return;
  }
  count = nextCount;
  listeners.forEach((listener) => listener());
}

export function getReactionCount() {
  return count;
}

export function getServerReactionCount() {
  return 0;
}

export function subscribeToReactionCount(listener: () => void) {
  listeners.add(listener);
  if (!eventSource) {
    eventSource = new EventSource("/api/reactions");
    eventSource.onmessage = (event) => {
      try {
        const data: unknown = JSON.parse(event.data);
        if (
          typeof data !== "object" ||
          data === null ||
          !("count" in data)
        ) {
          console.error("Received an invalid reaction count update.");
          return;
        }
        updateReactionCount(data.count);
      } catch (error) {
        console.error("Unable to read a reaction count update.", error);
      }
    };
    eventSource.onerror = (error) => {
      if (hasReportedStreamError) return;
      hasReportedStreamError = true;
      console.error("Reaction count live updates disconnected.", error);
    };
    eventSource.onopen = () => {
      hasReportedStreamError = false;
    };
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      eventSource?.close();
      eventSource = null;
    }
  };
}

export async function incrementReactionCount() {
  if (typeof window === "undefined") return;
  const response = await fetch("/api/reactions", { method: "POST" });
  if (!response.ok) {
    throw new Error(`Reaction count request failed (${response.status}).`);
  }
  const data: unknown = await response.json();
  if (typeof data !== "object" || data === null || !("count" in data)) {
    throw new Error("Reaction count response has an invalid shape.");
  }
  updateReactionCount(data.count);
}
