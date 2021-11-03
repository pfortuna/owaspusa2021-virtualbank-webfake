const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

const config = {
  useOtt: false
}

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'main'
}));

app.use(express.static('public'));
app.set('views', 'views');

app.get('/', (req, res) => {  
  req.app.locals.layout = "main";
  res.render('home', {config: config});
});

app.use(express.urlencoded({extended: true}));
app.get('/account', (req, res) => {
  res.render('account', {config: config});
});
app.get('/settings', (req, res) => {
  res.render('settings', {config: config});
});
app.get('/logout', (req, res) => {
  res.render('logout', {layout: false, config: config});
});

const server = app.listen(process.env.PORT || 5000, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});
