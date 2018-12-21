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
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected as id " + connection.threadId + "\n");
    createTable();
  })

  var createTable = function(){
    connection.query("SELECT * FROM products", function(err, res){
      for(var i = 0; i<res.length; i++){
        console.log(res[i].item_id 
          + " --- " + res[i].product_name 
          + " --- " + res[i].department_name 
          + " --- " + res[i].price 
          + " --- " + res[i].stock_quantity + "\n");
      }
    })
  }