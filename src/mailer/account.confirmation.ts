const accountCreateConfirmation = (name: string) => {
  return `
    <html>
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
                color: #ffffff;
                padding: 5px 0;
                text-align: center;
                border-radius: 20px;
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
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
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
                <p>Thank you for creating an account with us. Please confirm your email address by clicking the button below:</p>
                <p style="text-align: center;">
                    <a href="https://example.com/confirm?token=some_unique_token" style="color: white;" class="button">Confirm your email</a>
                </p>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>Flat Sharing Server LLV</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Flat Sharing Server LLV. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default accountCreateConfirmation;
