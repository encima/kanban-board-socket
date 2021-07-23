const PORT = process.env.PORT || 3030;
let uid = require('uid');
let app = require('express')();
let http = require('http').createServer(app);
//let io = require('socket.io')().listen(80);
var cors = require('cors')
let io = require('socket.io')(http);
let listsOfCardsSaved = [];
//let listsNamesSaved = [];
let listsNamesSaved = [ {id: uid.uid(), name:'Backlog', cards:[]},
     {id: uid.uid(), name: 'Next In', cards:[]},
     {id: uid.uid(), name: 'In Progress', cards:[]},
     {id: uid.uid(), name: 'Blocked', cards:[]},
     {id: uid.uid(), name: 'Ready for Review', cards:[]},
     {id: uid.uid(), name: 'Done', cards:[]}];

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/clearLists', (req, res) => {
   listofNamesSaved = [];
   res.send(listofNamesSaved);
});

io.on('connection', (socket) => {
    console.log('a user connected');
//    if(listsOfCardsSaved!=[])
    socket.emit('changeBoard', {lists: listsNamesSaved})
    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });
    socket.on('changeBoard', (payload) => {
        console.log(payload);
        io.emit('changeBoard', payload);
        listsOfCardsSaved = payload.listsOfCards;
        listsNamesSaved = payload.lists;
    })
  });

http.listen(PORT, () => {
  console.log('listening *');
});