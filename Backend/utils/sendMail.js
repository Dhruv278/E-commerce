const nodemailer=require('nodemailer');

const sendMail=async option=>{
  var transport
  if(process.env.NODE_ENV==="PRODUCTION"){

     transport = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: process.env.GMAIL_PORT,
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD
        }
      });
  }else{

     transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

      const message={
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:option.email,
        subject:option.subject,
        html:option.message

      }
      await transport.sendMail(message);

}

module.exports=sendMail;