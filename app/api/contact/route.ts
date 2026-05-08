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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save to Sanity
    await client.create({
      _type: "contactSubmission",
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    });

    // Send email notification
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // change after verifying your domain
      to: "sarah.h.nashaat@gmail.com", // ← your email here
      subject: `New message: ${subject || "No subject"}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || "—"}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
