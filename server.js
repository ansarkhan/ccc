// npm scripts:
// server: npm run server
// client: npm run client
// both:   npm run dev

const express = require('express');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api/', imageUploadRoutes);
require('./routes/apiRoutes')(app);

// React Front-End 
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  };

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`)
  });

  module.exports = app;