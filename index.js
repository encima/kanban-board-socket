let app = require('express')();
let http = require('http').createServer(app);
//let io = require('socket.io')().listen(80);
let io = require('socket.io')(http);
let listsOfCardsSaved = [];
let listsNamesSaved = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // console.log('a user connected');
    if(listsOfCardsSaved!=[])
        socket.emit('changeBoard', {listsOfCards:listsOfCardsSaved, listsNames: listsNamesSaved})
    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });
    socket.on('changeBoard', (payload) => {
        console.log(payload);
        io.emit('changeBoard', payload);
        listsOfCardsSaved = payload.listsOfCards;
        listsNamesSaved = payload.listsNames;
    })
  });

http.listen(3030, () => {
  console.log('listening on *:3030');
});

