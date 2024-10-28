/*const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: '8229bee66eaa6ec53596c932dd188303-784975b6-0a724c39'});

mg.messages.create('sandbox-123.mailgun.org', {
from: "<mailgun@sandbox2db5b8474df64f18b16df007956f59e2.mailgun.org>",
to: "vinayakpatkar42@gmail.com",
subject: "Hello",
text: "Testing some Mailgun awesomeness!",
html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); // logs any error*/
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user:'vinini240@gmail.com',
        pass:'hchv pbah ixag ewjs'
    }
}
)
function sendMail(){
    transporter.sendMail({
        to: "vinayakpatkar42@gmail.com",
        subject: "hello",
        html: "HEllo"
    })
}
sendMail()