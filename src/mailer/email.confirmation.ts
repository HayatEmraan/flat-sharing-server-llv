const emailConfirmation = (code: number) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Confirmation</title>
    <style>
       body {
        font-family: Arial, sans-serif;
        background-color: #c5bfd2;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #f3efef;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }
      .header {
        color: #ffffff;
        padding: 10px;
        border-radius: 10px 10px 0 0;
      }
      .content {
        padding: 20px 0;
      }
      .code {
        font-size: 24px;
        font-weight: bold;
        margin: 20px 0;
        color: #4caf50;
        background-color: #f4f4f4;
        padding: 10px;
        border-radius: 5px;
        display: inline-block;
      }
      .footer {
        margin-top: 20px;
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
        <p>Your confirmation code is:</p>
        <p class="code">${code}</p>
        <p>Please enter this code to confirm your email address.</p>
      </div>
      <p>Best regards,<br>Flat Sharing Server LLV</p>
      <div class="footer">
        <p>&copy; 2024 Flat Sharing Server LLV. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};

export default emailConfirmation;
