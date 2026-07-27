import { NextResponse } from 'next/server';
import {
  sendEmail,
  clean,
  isValidEmail,
  submittedOn,
  ORDER_NOTIFY_EMAIL,
  SITE_NAME,
} from '@/lib/mailer';

// Port of submit-order.php (Gospel Necklace order)
export async function POST(req: Request) {
  const form = await req.formData();

  // Honeypot
  if (form.get('website')) {
    return NextResponse.json({ success: true, message: 'Order sent successfully.' });
  }

  const firstName = clean(form.get('firstName'));
  const lastName = clean(form.get('lastName'));
  const fullName = `${firstName} ${lastName}`.trim();
  const email = clean(form.get('email'));
  const necklace = clean(form.get('necklace'));
  const price = parseFloat(String(form.get('price') ?? '0')) || 0;
  const customerNotes = clean(form.get('customerNotes'));
  const address1 = clean(form.get('address1'));
  const address2 = clean(form.get('address2'));
  const city = clean(form.get('city'));
  const state = clean(form.get('state'));
  const zip = clean(form.get('zip'));

  if (
    !firstName || !lastName || !email || !necklace || price <= 0 ||
    !address1 || !city || !state || !zip
  ) {
    return NextResponse.json({ success: false, message: 'Please fill in all required fields.' });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' });
  }

  const fullAddress = address2 ? `${address1}, ${address2}` : address1;

  const subject = `New Gospel Necklace Order - ${necklace}`;
  let message = `
<html>
<head>
    <style>
        body { font-family: Verdana, sans-serif; color: #333; font-size: 14px; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a2e0a; color: #ffcc00; padding: 20px; text-align: center; }
        .header h2 { margin: 0; font-size: 18px; }
        .body { background: #fff; padding: 25px; border: 1px solid #ccc; }
        .product { background: #f5f5e8; padding: 15px; border-radius: 4px; margin-bottom: 15px; }
        .product h3 { margin: 0 0 5px; color: #1a2e0a; }
        .product .price { font-size: 20px; color: #a88832; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 6px 0; border-bottom: 1px solid #eee; font-size: 13px; }
        td:first-child { font-weight: bold; width: 140px; color: #666; }
        .notes { background: #fffff0; padding: 12px; border: 1px solid #ddd; margin: 10px 0; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Order - ${SITE_NAME}</h2>
        </div>
        <div class='body'>
            <div class='product'>
                <h3>${necklace}</h3>
                <div class='price'>$${price}</div>
            </div>

            <h4>Customer Information</h4>
            <table>
                <tr><td>Name</td><td>${fullName}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
            </table>`;

  if (customerNotes) {
    message += `
            <h4 style='margin-top:15px;'>Customer Notes / Changes</h4>
            <div class='notes'>${customerNotes}</div>`;
  }

  message += `
            <h4 style='margin-top:15px;'>Shipping Address</h4>
            <table>
                <tr><td>Address</td><td>${fullAddress}</td></tr>
                <tr><td>City</td><td>${city}</td></tr>
                <tr><td>State</td><td>${state}</td></tr>
                <tr><td>ZIP Code</td><td>${zip}</td></tr>
            </table>

            <p style='margin-top:20px; color:#999; font-size:11px;'>
                Order submitted on ${submittedOn()}
            </p>
        </div>
    </div>
</body>
</html>`;

  // Notify the studio first — without it the order is lost, so we must not tell
  // the customer it succeeded.
  const result = await sendEmail(ORDER_NOTIFY_EMAIL, subject, message, email);
  if (!result.success) {
    return NextResponse.json({
      success: false,
      message: 'We could not process your order right now. Please call us at (336) 790-8214.',
    });
  }

  // Customer confirmation
  const custSubject = `Order Confirmation - Gospel Necklace - ${SITE_NAME}`;
  const custMessage = `
<html>
<body style='font-family: Verdana, sans-serif; color: #333; font-size: 14px;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
        <div style='background: #1a2e0a; color: #ffcc00; padding: 20px; text-align: center;'>
            <h2 style='margin:0;'>Thank You for Your Order!</h2>
        </div>
        <div style='background: #fff; padding: 25px; border: 1px solid #ccc;'>
            <p>Dear ${fullName},</p>
            <p>Thank you for ordering a <strong>${necklace}</strong> from ${SITE_NAME}.</p>
            <div style='background: #f5f5e8; padding: 15px; margin: 15px 0;'>
                <strong>Order Summary:</strong><br>
                ${necklace} - $${price}
            </div>
            <p><strong>Shipping To:</strong><br>
            ${fullAddress}<br>
            ${city}, ${state} ${zip}</p>
            <p>If you have not already, please complete your payment using the Pay Now button on our website.</p>
            <p>If you have any questions, please contact us at (336) 790-8214.</p>
            <p>Warm regards,<br>${SITE_NAME}</p>
        </div>
    </div>
</body>
</html>`;

  await sendEmail(email, custSubject, custMessage);

  return NextResponse.json({ success: true, message: 'Order sent successfully.' });
}
