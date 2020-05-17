// Populate this database with around 10 different products. (i.e. Insert
// "mock" data rows into this database and table).

// Then create a Node application called bamazonCustomer.js. Running this
// application will first display all of the items available for sale.
// Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would
// like to buy.

// Once the customer has placed the order, your application should check if
// your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then
// prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill
// the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their
// purchase.

var mysql = require('mysql');
var inquirer = require('inquirer');
const { table } = require('table');

var db = {
  conn: function () {
    var connection = mysql.createConnection({
      host: 'localhost',
      // port: 8889,
      port: 3306,
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
      // console.log(res);
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
  placeOrder: function (id, qty) {
    console.log('Grabbing Inventory...');
    var conn = this.conn();
    conn.query('SELECT * FROM products where Id = ?', id, function (err, res) {
      if (err) throw err;
      if (res[0].stock_quantity >= qty) {
        let message =
          'Placed order for ' +
          qty +
          ' unit(s) of ' +
          res[0].product_name +
          '.';
        console.log(message);
      } else {
        console.log('Insufficient quantity!');
      }
      conn.end();
    });
  },
};

function askQuestion() {
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
      console.info('itemId:', itemId);
      console.info('itemQty:', itemQty);
      db.placeOrder(itemId, itemQty);
      // query db with id and return id, name, qty
      // if qty is avilable update db and query all
      // else console Insufficient quantity!
    });
}

db.showAll(askQuestion);
