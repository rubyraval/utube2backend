const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "rubyraval@gmail.com",
      pass: "6dHxWXMRcEpqmvyT",
    },
  });



  
const SendEmail = async(toemail,subject,message) => {
    const info= await transporter.sendMail({
         from: '"Portal" <admin@portal.com>', // sender address
         to: toemail, // list of receivers
         subject: subject, // Subject line
         html: EmailTemplate(message,subject), // html body
     });
     console.log("Message sent: %s", info.messageId);
     return info;
  }  
 
  const EmailTemplate = (message,subject) => {
      
     return (`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml">
     
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title></title>
       <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
     </head>
     
     <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
       <table role="presentation"
         style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
         <tbody>
           <tr>
             <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
               <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                 <tbody>
                   <tr>
                     <td style="padding: 40px 0px 0px;">
                       <div style="text-align: left;">
                         <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png" alt="Company" style="width: 56px;"></div>
                       </div>
                       <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                         <div style="color: rgb(0, 0, 0); text-align: left;">
 
                           <h1 style="margin: 1rem 0">`+subject+`</h1>
                           <p>`+message.info+`</p>
                           <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                           <p style="padding-bottom: 16px"><strong style="font-size: 130%">`+message.otp+`</strong></p>
                           <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                           <p style="padding-bottom: 16px">Thanks,<br>The Mailmeteor team</p>
                         </div>
                       </div>
                       <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                         <p style="padding-bottom: 16px">Made with ♥ in Paris</p>
                       </div>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </td>
           </tr>
         </tbody>
       </table>
     </body>
     
     </html>`)
      
  };
 
  module.exports =  {
     SendEmail
  }
 
  

