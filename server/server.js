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

app.update('/:stockNameID', (req, res) => {
	db.updateStock(req.params.stockName, (err, data) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.status(200).json(data);
		}
	})
})

app.post('/:stockNameID', (req, res) => {
	db.addStock(req.params.stockName, (err, data) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.status(200).json(data);
		}
	});
})


app.delete('/:stockNameID', (req, res) => {
	db.deleteStock(req.params.stockName, (err, data) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.status(200).json(data);
		}
	})
})

app.listen(3000, () => console.log('listening on port 3000!'))