const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('upperCaseThis', (text)=>{
  return text.toUpperCase();
});

app.use((req, res, next)=>{
  let now = new Date().toString();

  console.log(`${now}: ${req.method} : ${req.url}`)
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.hbs', {
    name: 'Amy',
    pageTitle: 'Home Page',
    welcomeText: 'Welcome to New Web Server'
  })
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    name: 'Andrew',
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.get('/api/user', (req, res)=>{
  res.send({
    username: 'jack',
    email: 'jack@gmail.com',
    location: 'Boston',
    friends: ['Bob', 'Jill', 'Bill']
  });
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
