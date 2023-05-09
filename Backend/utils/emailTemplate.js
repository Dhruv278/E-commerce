exports.template = (message,name)  => {
    return `
     <!DOCTYPE html>
<html>
  <head>
    <title>Thank You for Visiting Our Website</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        background-color: #f7f7f7;
      }
      .container {
        width: 80%;
        margin: 0 auto;
        padding: 40px 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
      }
      h1 {
        font-size: 28px;
        margin-top: 0;
        margin-bottom: 20px;
        color: #333;
      }
      p {
        margin-top: 0;
        margin-bottom: 20px;
        color: #666;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Thank You for Visiting Our Website</h1>
      <p>Dear ${name},</p>
      <p>We would like to express our sincere gratitude for visiting our website. We appreciate the time you spent exploring our site and hope you found it informative and helpful. If you have any feedback or suggestions, please do not hesitate to let us know by replying to this email. We are always looking for ways to improve our website and your opinion matters to us.</p>
      <p>Once again, thank you for your interest and we hope to see you soon.</p>
      <p>Best regards,<br>Dhruv Gopani <br>(CEO of DG-Tech) </p>
    </div>
  </body>
</html>
     `
}