export const orderPlacedTemplate = (
  orderId: string,
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
  <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:8px;">

    <h1 style="color:#111827;">
      Order Confirmed!
    </h1>

    <p>
      Thank you for your purchase.
    </p>

    <p>
      Your order has been successfully placed.
    </p>

    <div
      style="
        background:#f3f4f6;
        padding:12px;
        border-radius:6px;
        margin:20px 0;
      "
    >
      <strong>Order ID:</strong> ${orderId}
    </div>

    <p>
      We'll notify you once your order ships.
    </p>

    <hr />

    <p style="color:#6b7280;font-size:14px;">
      Notification System Demo
    </p>

  </div>
</body>
</html>
`;