//node test2.js
var mysql = require('sync-mysql') ;
var client = new mysql({
  host: '10.149.80.140',
  port:31000,
  user: 'root',
  password: 'password',
  database: 'DTEST1'
})

var query = "SELECT * FROM events ;" ;
var r = client.query(query) ;

console.log(r) ;
