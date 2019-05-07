// npm scripts:
// server: npm run server
// client: npm run client
// both:   npm run dev

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


// React Front-End 
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  };