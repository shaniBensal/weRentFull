const express = require('express')

const app = express()
// const app = require('express')();

// ******
var http = require('http').Server(app);
var io = require('socket.io')(http);
// ******

var cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var bodyParser = require('body-parser')

app.use(express.static('dist'));


// ************************************************
// var app = require('express')();

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/chatSocket.vue');
// });
// ****************************************8

app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));

app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const addItemsRoutes = require('./routes/itemsRoute')
addItemsRoutes(app)

const addUserRoutes = require('./routes/userRoute')
addUserRoutes(app)

const addReviewRoutes = require('./routes/reviewRoute')
addReviewRoutes(app)

const addTransactionsRoutes = require('./routes/transactionRoute')
addTransactionsRoutes(app)


// http.listen(port, () => {
//  console.log(`App listening on port ${port}!`)
// });

//  *********************************************************

io.on('connection', function (socket) {
    // socket.on('disconnect', function () {
        // console.log('** socket.on.disconnected -- a user disconnected');
    // });

    socket.on('chat join', (msg) => {
        io.emit('chat message', { name: 'server', content: msg.name + ' joined the chat' });
        // io.emit('chat send-message', 'server talking here!');
    });

    socket.on('chat send-message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('new-order', (ownerId) => {
        io.emit('renderTransactions', ownerId)
    });
});

const port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log(`listening on *:${port}`);
});



// ************************************************