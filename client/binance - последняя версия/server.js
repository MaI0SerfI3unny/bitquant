var fs = require('fs');
const https = require('http')//require('https')
const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
//const privateKey  = fs.readFileSync('../ssl/www.botmarket24.online.key', 'utf8');
//const certificate = fs.readFileSync('../ssl/www.botmarket24.online.crt', 'utf8');
//const credentials = {key: privateKey, cert: certificate};
const app = express()
https.globalAgent.options.rejectUnauthorized = false;
const server = https.createServer(app);//(credentials, app);

const io = require('socket.io')(server, {serveClient: true, secure: false});//{serveClient: true, secure: true});
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
// app.use('/api/strategys', require('./routes/strategys.routes'))
app.use('/api/payments', require('./routes/payment.routes'))
// app.use('/api/tokens', require('./routes/tokens.routes'))
// app.use('/api/history', require('./routes/history.routes'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const PORT = config.get('port') || 5000

require('./sockets')(io);

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

