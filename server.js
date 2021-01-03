const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

const client_id = 'od8X2RmrYUSyIz27osG2';
const client_secret = 'nD2kytSJQj';

const port = process.env.PORT || 4000;

app.use(express.static(path.resolve(__dirname, 'frontend/build')));

app.get('/:searchType?', function (req, res, next) {
	let searchType = req.params.searchType;
  let indexParam = "";
	var query = req.query.query;
	if (!query) {
		next();
		return;
	}
  if(req.query.start) {
    indexParam = "&start=" + req.query.start;
  }
  const api_url = 'https://openapi.naver.com/v1/search/' + searchType + '.json?query=' + encodeURI(query) + '&display=5' + indexParam; // json 결과
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

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});


app.listen(port);

console.log(`Momentum app listening on port ${port}`);

