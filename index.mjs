import { parse } from 'url'
import next from 'next'
import socketIO from 'socket.io'
import { createServer } from 'http'
import NextCors from 'nextjs-cors';

let listsOfCardsSaved = [];
let listsNamesSaved = [];

const context = {
  io: null
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


const requestListener = async (req, res) => {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(req.url, true)

  req.context = context
  handle(req, res, parsedUrl)
}

app.prepare().then(() => {
  const port = parseInt(process.env.PORT || '3000', 10)

  const server = createServer(requestListener)

  context.io = socketIO(server)
context.io.on('connection', (socket) => {
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

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

