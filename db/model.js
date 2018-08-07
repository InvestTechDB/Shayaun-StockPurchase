var connection = require('./network.js');
var faker = require('faker');



const getOneStock = (stockid, callback) => {
	connection.query('SELECT * from stockprice where id = ?',[stockid], function (error, results, fields) {
		if(error){
			callback(error)
		}else{
			callback(null, results);
		}
	});
}

const deleteStock = (stockid, callback) => {
	connection.query(`DELETE FROM stockprice IF id = ${stockid};`, (err, res) => {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	});
}

const updateStock = (val, stockid, callback) => {
	connection.query(`UPDATE stockprice SET current_price = ${val} WHERE id = ${stockid};`)
}

const addStock = (val) => {
	connection.query(`INSERT INTO stockprice (stock_name) VALUES (${val});`)
}

const insertInitialData = () => {
	for (var i = 100; i > 0; i--) {
		var spread = Math.random()*0.15/2;//the biggest bid and ask spread on according the efts on vanguard 
		var prev_price = Number(faker.finance.amount());
		var cur_price = Number(faker.finance.amount());
		var insertArr = [faker.company.companyName(), cur_price - spread, Math.ceil(Math.random()*1700), cur_price + spread, Math.ceil(Math.random()*1700), cur_price, prev_price]
		var query = 'INSERT INTO stockprice (stock_name, bid, bid_volume, ask, ask_volume, current_price, prev_price) VALUES(?, ?, ?, ?, ?, ?, ?)';
		connection.query(query, insertArr, function (error, results, fields) {
		  if (error) throw error;
		  console.log('The solution is: ', results);
		});
	}
}

module.exports = {getOneStock, deleteStock, updateStock, addStock};

// insertInitialData()
// getOneStock(1, console.log);