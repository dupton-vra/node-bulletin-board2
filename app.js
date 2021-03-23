      /*var mysql = require('sync-mysql') ;
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
      })*/
new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '' },
    events: []
  },

  ready: function () {
    this.fetchEvents();
  },

  methods: {

    fetchEvents: function () {
      var events = [];
      this.$http.get('/api/events')
        .success(function (events) {
          this.$set('events', events);
          console.log(events);
        })
        .error(function (err) {
          console.log(err);
        });
    },

    addEvent: function () {
      if (this.event.title.trim()) {
        /*try{ 
            var rows = client.query("INSERT INTO events (id,title, details, date) VALUES (null,"+ this.event.title + " ,"+ this.event.details + "," + this.event.date + ");");
        } catch(e)
        {
            console.log("ER: " + e);     
        }*/
        this.events.push(this.event);
        this.$http.post('/api/events', this.event)
          .success(function (res) {
            this.events.push(this.event);
            this.event =   { title: '', detail: '', date: '' };
            console.log('Event added!');
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    deleteEvent: function (id) {
          
      console.log("ID0: " + id)
      if (confirm('Are you sure you want to delete this event?')) {   
        console.log("ID1: " + id)
        this.$http.delete('api/events/' + id)
          .success(function (res) {
            console.log("RES: " + res);
            console.log("ID: " + id)
            var index = this.events.find(x => x.id === id)
            console.log("index: " + index);
            this.events.splice(index, 1);
          })
          .error(function (err) {
            console.log("ERR: " + err);
          });
          console.log("ID2: " + id)
      }
      console.log("ID3: " + id)
    }
  }
});
