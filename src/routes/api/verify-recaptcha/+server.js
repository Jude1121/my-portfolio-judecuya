// src/routes/api/verify-recaptcha/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { token } = await request.json();

    if (!token) {
      return json({ success: false, message: 'No token provided' }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      return json({ success: false, message: "Failed reCAPTCHA verification" }, { status: 400 });
    }

    return json({ success: true, message: "Verified" });
  } catch (err) {
    console.error("Verification Error:", err);
    return json({ success: false, message: "Server error" }, { status: 500 });
  }
}
