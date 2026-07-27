// Email sender — port of the PHP mailer.php (Resend HTTP API).
// Reads secrets from environment variables (see .env.example).
import { Resend } from 'resend';

export interface MailResult {
  success: boolean;
  message: string;
}

const FROM = process.env.MAIL_FROM || 'Davidas Design Concepts <noreply@davidas.com>';

export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'davidas.design@yahoo.com';
// Gospel Necklace orders go to a SEPARATE inbox (falls back to general one).
export const ORDER_NOTIFY_EMAIL =
  process.env.ORDER_NOTIFY_EMAIL || process.env.NOTIFY_EMAIL || 'gospel.necklace@yahoo.com';

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Mirrors PHP behavior when config.php is missing.
    return { success: false, message: 'Mail is not configured on this server.' };
  }
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      return { success: false, message: error.message || 'Unknown error' };
    }
    return { success: true, message: 'Email sent successfully.' };
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : 'Network error: unable to reach Resend API.',
    };
  }
}

// Escape user-supplied text before embedding in HTML (port of PHP clean()).
export function clean(str: unknown): string {
  return String(str ?? '')
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// "July 27, 2026 at 3:04 PM" — matches the PHP date('F j, Y \a\t g:i A') format.
export function submittedOn(): string {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${date} at ${time}`;
}

export const SITE_NAME = 'Davidas Design Concepts';
