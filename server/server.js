const express = require('express')
const app = express()
const db = require('../db/model.js')
var bodyParser = require('body-parser')


app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
 
 app.use(function (req, res, next) {
  console.log(req.method + ' @ '+ Date())
  next()
})

app.get('/:stockNameID', (req, res) => {
  db.getOneStock(req.params.stockNameID, (err, data) => {
  	if(err){
  		res.sendStatus(404);
  	}else{
  		res.status(200).json(data);
  	}
  });
});

app.post('/:stockNameID', (req, res) => {
	res.sendStatus(404);
})

app.update('/:stockNameID', (req, res) => {
	res.sendStatus(404);
})

app.delete('/:stockNameID', (req, res) => {
	res.sendStatus(404);
})

app.listen(3000, () => console.log('xlistening on port 3000!'))