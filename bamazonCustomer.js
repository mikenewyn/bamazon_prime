var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connected as id " + connection.threadId + "\n");
  createTable();
})

var createTable = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id
        + " --- " + res[i].product_name
        + " --- " + res[i].department_name
        + " --- " + res[i].price
        + " --- " + res[i].stock_quantity + "\n");
    }
    console.log("Welcome to Bamazon! See above for items for sale today.");
    customerPrompt(res);
  })
}

function customerPrompt() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "choice",
        type: "input",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
          }
          return choiceArray;
        },
        message: "What would you like to purchase today?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      },
    ])
      .then(function (reply){
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === reply.choice) {
            chosenItem = res[i];
          }
        }

        if (chosenItem.stock_quantity > parseInt(choice.quantity)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity -= reply.quantity
              },
              {
                id: chosenItem.id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log(stock_quantity);
              console.log("Your order has been placed!");
              createTable();
            }
          );
        }
        else {
          console.log("Sorry, we do not have the requested quantity of that item.");
          console.log("We have only " + chosenItem.stock_quantity + " left.")
          createTable();
        }

      });
  });
}









// var customerPrompt = function (res) {
//   inquirer.prompt([{
//     type: "input",
//     name: "choice",
//     message: "What would you like to purchase today?"
//   }]).then(function (reply) {
//     var item = false;
//     for (var i = 0; i < res.length; i++) {
//       if (res[i].product_name == reply.choice) {
//         item = true;
//         var product = reply.choice;
//         var id = i;
//         inquirer.prompt({
//           type: "input",
//           name: "quantity",
//           message: "How many would you like?",
//           validate: function (value) {
//             if (isNaN(value) == false) {
//               return true;
//             } else {
//               return false;
//             }
//           }
//         }).then(function (reply) {
//           if ((res[id].stock_quantity-reply.quantity) > 0) {
//             connection.query("UPDATE products SET stock_quantity='" + (res[i].stock_quantity-reply.quantity) + "'WHERE product_name='" + product + "'", function (err, res2) {
//               console.log("Purchase Confirmed!");
//               createTable();
//             })
//           } else {
//             console.log("Insufficient Quantity!");
//             customerPrompt(res);
//           }
//         })
//       }
//     }
//   })
// }