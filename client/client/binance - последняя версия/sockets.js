"use stict";

const _ = require('lodash');

const config = require('config')
let clientscount = 0;
let clients = [];
module.exports = io => {
    io.on('connection', async function (socket) {
        var id = socket.id;
        //socket.name = socket.handshake.query.name
        clients.push(socket);
        clientscount++;
        const filtered = _.uniqBy(clients, "name")
        console.log(`client connected... count ${clientscount} ip: ${socket.request.socket.remoteAddress}`);

        socket.on('message', content => {
            socket.emit("message", content);
            socket.emit("message", "success");
        });
        socket.on('ping', request => {
            try {
                socket.emit("ping", {result: "success", message: "pong"});
            } catch (e) {
                console.error("E, signal,", e);
                socket.emit("ping", {result: "error", message: "pong"});
            }
        });
        socket.on('signal', request => {
            try {
                //if (socket.auth) {
                    socket.broadcast.emit(request.strategy, {result: "success", message: "new signal", data: request});
                    socket.emit("signal", {result: "success", message: "signal send"});
                //} else {
                    //socket.emit("signal", {result: "error", message: "some error"});
               // }
            } catch (e) {
                console.error("E, signal,", e);
                socket.emit("signal", {result: "error", message: "some error"});
            }
        });

        socket.on('disconnect', async (reason) => {
            clients.splice(clients.indexOf(socket), 1);
            const filtered = _.uniqBy(clients, "name")
            console.log("client leave");
            clientscount--;
            socket.auth = false;
            socket.disconnect(true);
        });
    });
};