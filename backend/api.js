
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
  port: 31000,
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
       events.push({title: rows[i].title,
                  detail: rows[i].details,
                  date: rows[i].date
                  });

    }
    res.json(events);

};
exports.event = function (req, res) {
      //console.log("req10: " + req);
      //console.log("req11: " + req.params);
      //console.log("req1: " + req.params.title);
      //console.log("req2: " + req.param("title","foo") + " " + req.param("detail","foo") + " " + req.param("date","foo"));    
      //console.log("INSERT INTO events (id,title, details, date) VALUES (null,'"+ req.param("title","foo") + "','"+ req.param("detail","foo")+ "','" + req.param("date","foo") + "');")
      var rows = client.query("INSERT INTO events (id,title, details, date) VALUES (null,'"+ req.param("title","foo") + "','"+ req.param("detail","foo")+ "','" + req.param("date","foo") + "');");
      //var rows = client.query("INSERT INTO events (id,title, details, date) VALUES (null,"+ req.param.title + " ,"+ req.param.details + "," + req.param.date + ");");
      //var rows = client.query('SELECT * from events where id=' + req.param.eventId)
      //console.log("rows: " + rows);
      //console.log("rows: " + rows[0].id);
      var obj = "{title:" + req.param("title","foo") + "," + "detail:" + req.param("detail","foo") + "," + "date:" + req.param("date","foo") + "}"
      events.push(obj);

    res.json(events[req.param("eventId",null);
 
 
 //res.json(events[req.param.eventId]);
};


