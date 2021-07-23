const PORT = process.env.PORT || 3030;

let app = require('express')();
let http = require('http').createServer(app);
//let io = require('socket.io')().listen(80);
var cors = require('cors')
let io = require('socket.io')(http);
let listsOfCardsSaved = [];
let listsNamesSaved = [];

app.use(cors());

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

http.listen(PORT, () => {
  console.log('listening *');
});

