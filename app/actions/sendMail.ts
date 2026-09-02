"use server";

import { createRequire } from "node:module";

type NodemailerModule = {
  createTransport: (options: {
    direct: boolean;
    host: string;
    port: number;
  }) => {
    sendMail: (message: {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      text: string;
    }) => Promise<unknown>;
  };
};

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  budget?: unknown;
  message?: unknown;
};

type SendMailResult = {
  ok: boolean;
  error?: string;
};

const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer") as NodemailerModule;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendLeadMail(
  payload: LeadPayload,
): Promise<SendMailResult> {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!receiverEmail) {
    return {
      ok: false,
      error: "Contact receiver email is not configured.",
    };
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const projectType = clean(payload.projectType);
  const budget = clean(payload.budget);
  const message = clean(payload.message);

  if (!name || !email || !projectType || !budget || !message) {
    return {
      ok: false,
      error: "All fields are required.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      direct: true,
      host: "localhost",
      port: 25,
    });

    await transporter.sendMail({
      from: receiverEmail,
      to: receiverEmail,
      replyTo: email,
      subject: `New AI project brief from ${name}`,
      text: [
        "New AI project brief",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Project Type: ${projectType}`,
        `Budget: ${budget}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return { ok: true };
  } catch (error) {
    console.error(
      "Direct MX email failed. Port 25 may be blocked by the server environment.",
      error,
    );

    return {
      ok: false,
      error: "Unable to submit your message.",
    };
  }
}
