const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

const client_id = 'od8X2RmrYUSyIz27osG2';
const client_secret = 'nD2kytSJQj';

app.use(express.static(path.join(__dirname, '/build/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.get('/movies/:query', function (req, res) {
  const api_url = `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI(req.params.query)}&display=5`; // json 결과
  const options = {
    url: api_url,
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});


const port = process.env.PORT || 4000;
app.listen(port);

console.log(`Momentum app listening on port ${port}`);
