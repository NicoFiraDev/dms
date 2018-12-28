const express     = require('express'),
      hbs         = require('hbs'),
      path        = require('path'),
      publicPath  = path.join(__dirname, '/public'),
      partials    = path.join(__dirname, '/views/partials'),
      port        = process.env.PORT || 3000,
      bodyParser  = require('body-parser'),
      nodemailer  = require('nodemailer');

require('dotenv').config();
var app         = express(),
    myEmail     = process.env.EMAIL_ACCOUNT,
    myPassword  = process.env.EMAIL_PASSWORD;

hbs.registerPartials(partials);
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.get('/', (req, res) => {
  res.redirect('/home')
})

app.get('/home', (req, res) => {
  res.render('home');
});

app.post('/home', (req, res) => {
  var name    = req.body.name,
      email   = req.body.email,
      phone   = req.body.phone,
      message = req.body.message;

  var transporter = nodemailer.createTransport({
    host: 'mail.digimarketingsolutions.co',
    port: 465,
    auth: {
      user: myEmail,
      pass: myPassword
    }
  });

  var mailMessage = {
    from: myEmail,
    to: myEmail,
    subject: `New contact from ${name}`,
    html: `<h1>Nuevo Contacto</h1>
    <p>${name} has contacted you</p>
    <p>His/her email is: ${email} and his phone is: ${phone} - optional</p>
    <p>${message}</p>`
  };

  var clientMessage = {
    from: myEmail,
    to: email,
    subject: `Thank you ${name} for contacting us`,
    html: `<h1>Digi Marketing Solutions</h1>
    <p>Thank you ${name} for contacting us</p>
    <p>We will get in touch with you as sonn as possible.</p>`
  }

  transporter.verify((error) => {
    if(error){
      return console.log(error);
    } else {
      // Sending email to us
      transporter.sendMail(mailMessage, (err, info) => {
        if(err){
          console.log(err);
        }
          res.send(console.log(`Email sent: ${info.response}`));
      });
      // Sending email to client
      transporter.sendMail(clientMessage, (err, info) => {
        if(err){
          console.log(err);
        }
        res.send(console.log(`Email sent: ${info.response}`));
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
