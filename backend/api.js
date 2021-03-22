
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
       events.push({ id: i,
                     title: rows[i].title,
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
      
     if(req.param("title",null) != null)
     {
       console.log("HERE: " + req.param("title",null));
       var rows = client.query("INSERT INTO events (id,title, details, date) VALUES (null,'"+ req.param("title",null) + "','"+ req.param("detail",null)+ "','" + req.param("date",null) + "');");
       var obj = "{id:" + rows[0].id + "," + "title:" + req.param("title","foo") + "," + "detail:" + req.param("detail","foo") + "," + "date:" + req.param("date","foo") + "}"
       events.push(obj);
      console.log("row: " + rows[0].id);
       res.json(events[rows[0].id]);
     } else {
        console.log("req: " + req.eventId);
        console.log("req: " + req.query.eventId);
        console.log("req1: " + req.body.eventId);
        console.log("req2: " + req.params.eventId);
        console.log("req2: " + req.params['id']);
        console.log("req2: " + req.params['title']);
        console.log("req3: " + req.query);
         //console.log("req2: " + req.toString());
     }
      
      //var rows = client.query("INSERT INTO events (id,title, details, date) VALUES (null,"+ req.param.title + " ,"+ req.param.details + "," + req.param.date + ");");
      //var rows = client.query('SELECT * from events where id=' + req.param.eventId)
      //console.log("rows: " + rows);
      //console.log("rows: " + rows[0].id);
      res.json(events);
 
 
 //res.json(events[req.param.eventId]);
};


