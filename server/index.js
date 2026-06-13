import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? [
      "http://localhost:3000",
      "https://91-11.com",
    ],
  })
);
app.use(express.json());

const transporter =
  process.env.SMTP_HOST &&
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "91-11-inquiry-api" });
});

app.post("/api/inquiry", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      brand,
      projectType,
      budget,
      timeline,
      vision,
    } = req.body;

    if (!name || !email || !projectType || !vision) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const inquiry = {
      name,
      email,
      phone: phone ?? "",
      brand: brand ?? "",
      projectType,
      budget: budget ?? "",
      timeline: timeline ?? "",
      vision,
      receivedAt: new Date().toISOString(),
    };

    console.info("[Inquiry]", inquiry);

    if (transporter && process.env.INQUIRY_TO_EMAIL) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
        to: process.env.INQUIRY_TO_EMAIL,
        replyTo: email,
        subject: `New Project Inquiry — ${name}${brand ? ` (${brand})` : ""}`,
        text: Object.entries(inquiry)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),
        html: `<pre>${JSON.stringify(inquiry, null, 2)}</pre>`,
      });
    }

    if (process.env.INQUIRY_WEBHOOK_URL) {
      await fetch(process.env.INQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

app.listen(PORT, () => {
  console.log(`91-11 API running on http://localhost:${PORT}`);
});
