import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});
export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form is unavailable: RESEND_API_KEY is not configured.");
    return Response.json(
      { error: "Form kontak belum dikonfigurasi. Silakan hubungi saya langsung melalui email." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Contact form received invalid JSON.", error);
    return Response.json({ error: "Permintaan formulir tidak valid." }, { status: 400 });
  }

  const parsed = Email.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Data formulir tidak valid." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Terlalu banyak percobaan. Silakan coba lagi satu menit lagi." },
      { status: 429 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      replyTo: parsed.data.email,
      subject: `Portfolio contact from ${parsed.data.fullName}`,
      react: EmailTemplate({
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        message: parsed.data.message,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Resend rejected a portfolio contact message.", {
        name: error.name,
        message: error.message,
      });
      return Response.json(
        { error: "Email gagal dikirim. Silakan coba lagi atau hubungi saya langsung melalui email." },
        { status: 502 }
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Portfolio contact email request failed.", error);
    return Response.json(
      { error: "Layanan email sedang bermasalah. Silakan coba lagi atau hubungi saya langsung melalui email." },
      { status: 502 }
    );
  }
}
