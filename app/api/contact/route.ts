import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Step 1: Sanity
    try {
      await client.create({
        _type: "contactSubmission",
        name,
        email,
        subject,
        message,
        submittedAt: new Date().toISOString(),
      });
    } catch (sanityErr) {
      const msg = sanityErr instanceof Error ? sanityErr.message : "Unknown error";
      console.error("SANITY ERROR:", msg);
      return NextResponse.json(
        { error: "Sanity failed: " + msg },
        { status: 500 },
      );
    }

    // Step 2: Resend
    try {
      const { error: resendError } = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: "sarah.h.nashaat@gmail.com",
        subject: `New message: ${subject || "No subject"}`,
        html: `
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject || "—"}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br/> ")}</p>
        `,
      });
      if (resendError) {
        console.error("RESEND ERROR:", resendError);
        return NextResponse.json(
          { error: "Resend failed: " + resendError.message },
          { status: 500 },
        );
      }
    } catch (resendErr) {
      const msg = resendErr instanceof Error ? resendErr.message : "Unknown error";
      console.error("RESEND EXCEPTION:", msg);
      return NextResponse.json(
        { error: "Resend exception: " + msg },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("UNHANDLED ERROR:", msg);
    return NextResponse.json(
      { error: msg },
      { status: 500 },
    );
  }
}
