import {
  getReactionCount,
  incrementReactionCount,
  subscribeToReactionCount,
} from "@/lib/reaction-count-server";

const encoder = new TextEncoder();

export async function GET(request: Request) {
  let cancelStream = () => {};
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const send = (data: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(data));
        } catch (error) {
          console.error("Unable to publish a reaction count update.", error);
          close();
        }
      };
      const unsubscribe = subscribeToReactionCount((count) => {
        send(`data: ${JSON.stringify({ count })}\n\n`);
      });
      const keepAlive = setInterval(() => send(": keepalive\n\n"), 25_000);

      const cleanup = (closeController: boolean) => {
        if (closed) return;
        closed = true;
        clearInterval(keepAlive);
        unsubscribe();
        request.signal.removeEventListener("abort", close);
        if (!closeController) return;
        try {
          controller.close();
        } catch (error) {
          console.error("Unable to close the reaction count stream.", error);
        }
      };
      const close = () => cleanup(true);
      cancelStream = () => cleanup(false);

      send(`data: ${JSON.stringify({ count: getReactionCount() })}\n\n`);
      request.signal.addEventListener("abort", close, { once: true });
    },
    cancel() {
      cancelStream();
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientId =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const result = incrementReactionCount(clientId);

  if (!result.accepted) {
    return Response.json(
      { error: "Reaction limit reached. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      }
    );
  }

  return Response.json({ count: result.count });
}
