import { NextResponse } from 'next/server';
import {
  sendEmail,
  clean,
  isValidEmail,
  submittedOn,
  NOTIFY_EMAIL,
  SITE_NAME,
} from '@/lib/mailer';

// Port of submit-inquiry.php
export async function POST(req: Request) {
  const form = await req.formData();

  // Honeypot
  if (form.get('website')) {
    return NextResponse.json({ success: true, message: 'Inquiry sent successfully!' });
  }

  const firstName = clean(form.get('fname'));
  const lastName = clean(form.get('lname'));
  const fullName = `${firstName} ${lastName}`.trim();
  const email = clean(form.get('email'));
  const style = clean(form.get('style'));
  const message = clean(form.get('message'));

  if (!firstName || !lastName || !email || !style) {
    return NextResponse.json({ success: false, message: 'Please fill in all required fields.' });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' });
  }

  const subject = `Pricing Inquiry - Style #${style} - ${SITE_NAME}`;
  let body = `
<html>
<head>
    <style>
        body { font-family: Verdana, sans-serif; color: #333; font-size: 14px; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a2e0a; color: #ffcc00; padding: 20px; text-align: center; }
        .header h2 { margin: 0; font-size: 18px; }
        .body { background: #fff; padding: 25px; border: 1px solid #ccc; }
        .style-badge { background: #f5f5e8; padding: 15px; border-radius: 4px; margin-bottom: 15px; }
        .style-badge h3 { margin: 0; color: #1a2e0a; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; border-bottom: 1px solid #eee; font-size: 13px; }
        td:first-child { font-weight: bold; width: 140px; color: #666; }
        .message { background: #fffff0; padding: 12px; border: 1px solid #ddd; margin: 10px 0; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Pricing Inquiry - ${SITE_NAME}</h2>
        </div>
        <div class='body'>
            <div class='style-badge'>
                <h3>Style #${style}</h3>
            </div>

            <h4>Customer Information</h4>
            <table>
                <tr><td>Name</td><td>${fullName}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
            </table>`;

  if (message) {
    body += `
            <h4 style='margin-top:15px;'>Customer Notes</h4>
            <div class='message'>${message}</div>`;
  }

  body += `
            <p style='margin-top:20px; color:#999; font-size:11px;'>
                Submitted on ${submittedOn()}
            </p>
        </div>
    </div>
</body>
</html>`;

  const result = await sendEmail(NOTIFY_EMAIL, subject, body, email);
  if (result.success) {
    return NextResponse.json({ success: true, message: 'Inquiry sent successfully!' });
  }
  return NextResponse.json({
    success: false,
    message: 'Failed to send. Please call us at (336) 790-8214.',
  });
}
