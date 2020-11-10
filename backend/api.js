var events = require('./events.js');
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'DTEST1
})

exports.events = function (req, res) {
    //res.json(events);
    connection.query('SELECT * from events', function (err, rows, fields) {
      if (err) throw err
          console.log('The solution is: ')
      var objs = [];
      for (var i = 0;i < rows.length; i++) {
          objs.push({title: rows[i].title,
                     details: rows[i].details,
                     date: rows[i].date
                    });
      }
      connection.end()
      res.end(JSON.stringify(objs));
    }
}

  
};

exports.event = function (req, res) {
  res.json(events[req.param.eventId]);
};
