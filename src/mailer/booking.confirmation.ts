const bookingConfirmation = (
  name: string,
  location: string,
  bookingId: string,
  bookingDate: string
) => {
  return `<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(104, 77, 77, 0.1);
      }
      .header {
        /* background-color: #4CAF50; */
        color: #ffffff;
        padding: 10px 0;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        font-size: 16px;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .button-approve {
        background-color: #4caf50;
      }
      .button-decline {
        background-color: #f44336;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://i.ibb.co/xYsmSpJ/Flatvue.png" alt="" />
      </div>
      <div class="content">
        <p>Hi ${name},</p>
        <p>
          Thank you for your booking request. Your booking request is pending
          confirmation.
        </p>
        <!-- Include this section if the booking is approved -->
        <div id="approved" style="display: [ApprovedDisplay]">
          <p>Your booking details are as follows:</p>
          <ul>
            <li><strong>Booking ID:</strong> ${
              bookingId.slice(0, 15) + "*****"
            }</li>
            <li><strong>Date:</strong> ${bookingDate}</li>
            <li><strong>Venue:</strong> ${location}</li>
          </ul>
        </div>
        <!-- Include this section if the booking is declined -->
        <div id="declined" style="display: [DeclinedDisplay]">
          <p>We will notify you once your booking is confirmed.</p>
        </div>
        <p>Best regards,<br />Flat Sharing Server LLV</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Flat Sharing Server LLV. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};

const bookingConfirmed = (
  name: string,
  location: string,
  bookingId: string,
  bookingDate: string
) => {
  return `<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        /* background-color: #4CAF50; */
        color: #ffffff;
        padding: 10px 0;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        font-size: 16px;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .button-approve {
        background-color: #4caf50;
      }
      .button-decline {
        background-color: #f44336;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://i.ibb.co/xYsmSpJ/Flatvue.png" alt="" />
      </div>
      <div class="content">
        <p>Hi ${name},</p>
        <p>
          Thank you for your booking request. We are pleased to inform you that
          your booking has been <strong>CONFIRMED</strong>.
        </p>
        <!-- Include this section if the booking is approved -->
        <div id="approved" style="display: [ApprovedDisplay]">
          <p>Your booking details are as follows:</p>
          <ul>
            <li><strong>Booking ID:</strong> ${
              bookingId.slice(0, 15) + "*****"
            }</li>
            <li><strong>Date:</strong> ${bookingDate}</li>
            <li><strong>Venue:</strong> ${location}</li>
          </ul>
        </div>
        <p>Best regards,<br />Flat Sharing Server LLV</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Flat Sharing Server LLV. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};

const bookingDeclined = (name: string) => {
  return `    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                /* background-color: #4CAF50; */
                color: #ffffff;
                padding: 10px 0;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                font-size: 16px;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            .button-approve {
                background-color: #4CAF50;
            }
            .button-decline {
                background-color: #f44336;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://i.ibb.co/xYsmSpJ/Flatvue.png" alt="">
            </div>
            <div class="content">
                <p>Hi ${name},</p>
                <p>Thank you for your booking request. We are pleased to inform you that your booking has been <strong>DECLINED</strong>.</p>
                <!-- Include this section if the booking is declined -->
                <div id="declined" style="display: [DeclinedDisplay];">
                    <p>Unfortunately, we are unable to accommodate your booking at this time. Please contact our support team for further assistance.</p>
                    <p style="text-align: center;">
                        <a href="mailto:support@example.com" class="button button-decline">Contact Support</a>
                    </p>
                </div>
                <p>Best regards,<br>Flat Sharing Server LLV</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Flat Sharing Server LLV. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export const bookingNotification = {
  bookingConfirmation,
  bookingConfirmed,
  bookingDeclined,
};
