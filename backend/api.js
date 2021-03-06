
//var events = require('./events.js');
var events = [];
var mysql = require('sync-mysql') ;
var sqlHost = process.env.SQL_HOST
if(sqlHost == null)
{
 console.log("ENV SQL_HOST null");
 //throw "ENV SQL_HOST null"
  //sqlHost = "192.168.195.37";
}
var client = new mysql({
  host: sqlHost,
  user: 'root',
  password: 'password',
  database: 'DTEST1'
})
/*
var query = "SELECT * FROM events ;" ;
var r = client.query(query) ;

console.log(r) ;
*/
exports.events = function (req, res) {
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

      console.log("req: " + req);
      var rows = client.query('SELECT * from events where id=' + req.param.eventId)

      var obj = "{title:" + rows[0].title + "," + "detail:" + rows[0].details + "," + "date:" + rows[0].date + "}"
      events.push(obj);

    res.json(events[req.param.eventId]);
};


