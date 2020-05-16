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
var table = require('text-table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306 || 8889,
  user: 'root',
  password: 'root',
  database: 'bamazon',
});

// var connection = mysql.createConnection({
//   host: 'localhost',
//   port: 8889,
//   user: 'root',
//   password: 'root',
//   database: 'bamazon',
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId);
//   connection.end();
// });

function gueryData() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    // console.log(res);
    allItems = [
      ['Id', 'Product Name', 'Price', 'Quantity'],
      ['', '', '', ''],
    ];
    res.forEach((item) => {
      var row = [item.id, item.product_name, item.price, item.stock_quantity];
      allItems.push(row);
    });
    var t = table(allItems);
    console.table(res, [
      'id',
      'product_name',
      'department_name',
      'price',
      'stock_quantity',
    ]);
    connection.end();
  });
}
gueryData();

// var t = table([
//   ['master', '0123456789abcdef'],
//   ['staging', 'fedcba9876543210'],
// ]);
// inquirer
//   .prompt([
//     {
//       name: 'faveReptile',
//       message: 'What is your favorite reptile?',
//     },
//   ])
//   .then((answers) => {
//     console.info('Answer:', answers.faveReptile);
//   });
