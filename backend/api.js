
//var events = require('./events.js');
var events = [];
var mysql = require('sync-mysql') ;
var sqlHost = process.env.SQL_HOST
if(sqlHost == null || sqlHost == "")
{
 console.log("ENV SQL_HOST null");
 //throw "ENV SQL_HOST null"
 //sqlHost = "192.168.171.206";
}
var client = new mysql({
  host: sqlHost,
  user: 'root',
  port: 3306,
  password: 'password',
  database: 'DTEST1'
})
/*
var query = "SELECT * FROM events ;" ;
var r = client.query(query) ;

console.log(r) ;
*/
exports.events = function (req, res) {
   events = [];
   var rows = client.query('SELECT * from events')
   for (var i = 0;i < rows.length; i++) {
       console.log("TITLE: " + rows[i].title);
       console.log("ID: " + rows[i].id);
       events.push({ id: rows[i].id,
                     title: rows[i].title,
                     detail: rows[i].details,
                     date: rows[i].date
                  });

    }
    res.json(events);

};
exports.event = function (req, res) {
     console.log("body: " + req.body);
     if(req.param("title",null) != null)
     {
        
        console.log("HERE1: " + req.body.title);
        client.query("INSERT INTO events (id,title, details, date) VALUES (null,'"+ req.body.title + "','"+ req.body.detail + "','" + req.body.date + "');");
        var rows = client.query('SELECT * from events')
        console.log("LENGTH: " + rows.length);
        console.log("row: " + rows[rows.length -1].id)
        console.log("row: " + rows[rows.length -1].title)
        var obj = {id: rows[rows.length -1].id,
                   title: rows[rows.length -1].title,
                   detail: rows[rows.length -1].detail,
                   date: rows[rows.length -1].date }
        events.push(obj);
        res.json(events[events.lenght -1]);
     } else {
        console.log("DELETE ITEM: " + req.params.eventId);
        console.log("DELETE FROM events where( id = " + req.params.eventId + ");");
        var rows = client.query("DELETE FROM events where( id = " + req.params.eventId + ");");        
        res.json(events[req.params.eventId])
     }
      

};


