type ReactionListener = (count: number) => void;
type RateLimitEntry = { count: number; resetAt: number };

type ReactionCountState = {
  count: number;
  listeners: Set<ReactionListener>;
  rateLimits: Map<string, RateLimitEntry>;
};

const globalForReactionCount = globalThis as typeof globalThis & {
  reactionCountState?: ReactionCountState;
};

const state = (globalForReactionCount.reactionCountState ??= {
  count: 0,
  listeners: new Set<ReactionListener>(),
  rateLimits: new Map<string, RateLimitEntry>(),
});

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60_000;

export function getReactionCount() {
  return state.count;
}

export function subscribeToReactionCount(listener: ReactionListener) {
  state.listeners.add(listener);
  return () => state.listeners.delete(listener);
}

export function incrementReactionCount(clientId: string) {
  const now = Date.now();
  const limit = state.rateLimits.get(clientId);

  if (!limit || now >= limit.resetAt) {
    state.rateLimits.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    if (limit.count >= RATE_LIMIT_MAX) {
      return { accepted: false, count: state.count };
    }
    limit.count += 1;
  }

  if (state.rateLimits.size > 10_000) {
    for (const [id, entry] of state.rateLimits) {
      if (now >= entry.resetAt) state.rateLimits.delete(id);
    }
  }

  state.count += 1;
  state.listeners.forEach((listener) => listener(state.count));
  return { accepted: true, count: state.count };
}
