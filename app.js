const express     = require('express'),
      hbs         = require('hbs'),
      path        = require('path'),
      publicPath  = path.join(__dirname, '/public'),
      partials    = path.join(__dirname, '/views/partials'),
      port        = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(partials);
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Inicio'
  });
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
