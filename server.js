const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
  console.log('server listening on port : ', port);
});