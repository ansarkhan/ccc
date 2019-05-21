const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')


const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(fileUpload());

require('./routes/apiRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const PORT = process.env.NODE_ENV || 4000;
app.listen(PORT, () => {
    console.log(`listening to port`)
})