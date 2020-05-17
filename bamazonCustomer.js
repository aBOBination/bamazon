var mysql = require('mysql');
var inquirer = require('inquirer');
const { table } = require('table');

var db = {
  conn: function () {
    var connection = mysql.createConnection({
      host: 'localhost',
      port: 8889, // mac
      // port: 3306, // windows
      user: 'root',
      password: 'root',
      database: 'bamazon',
    });
    return connection;
  },

  showAll: function (callback) {
    console.log('Grabbing Inventory...');
    var conn = this.conn();
    conn.query('SELECT * FROM products', function (err, res) {
      if (err) throw err;
      allItems = [['Id', 'Product Name', 'Price', 'Quantity']];
      res.forEach((item) => {
        var row = [item.id, item.product_name, item.price, item.stock_quantity];
        allItems.push(row);
      });
      var t = table(allItems);
      console.log(t);
      conn.end(callback);
    });
  },

  tryOrder: function (id, qty) {
    var conn = this.conn();
    conn.query('SELECT * FROM products where Id = ?', id, function (err, res) {
      if (err) throw err;
      if (res[0].stock_quantity >= qty) {
        let newQty = parseInt(res[0].stock_quantity) - parseInt(qty);
        let product = res[0].product_name;
        let price = res[0].price;
        let total = qty * price;
        let message = `${product} X ${qty}: $ ${total}.`;
        console.log('Order placed:\n' + message);
        db.updateTable(id, newQty);
      } else {
        console.log('Insufficient quantity!');
      }
      conn.end();
    });
  },

  updateTable: function (id, newQty) {
    var conn = this.conn();
    var updateQuery = 'UPDATE products SET stock_quantity = ? WHERE id = ?;';
    conn.query(updateQuery, [newQty, id], function (err, res) {
      if (err) throw err;
      conn.end();
    });
  },
};

function placeOrder() {
  inquirer
    .prompt([
      {
        name: 'itemId',
        message: 'What item do you wish to buy?  Enter Id of item.',
      },
      {
        name: 'itemQty',
        message: 'How many do you want?',
      },
    ])
    .then((answers) => {
      let itemId = answers.itemId;
      let itemQty = answers.itemQty;
      db.tryOrder(itemId, itemQty);
    });
}

db.showAll(placeOrder);
