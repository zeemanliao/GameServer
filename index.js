var gameServer = require('GameService')({name:'GameServer',port:8888});


gameServer.connectServer({name:'DataServer',host:'localhost',port:9988});

gameServer.connectServer({name:'ConfigServer',host:'localhost',port:3355});

gameServer.connectServer({name:'AdminServer',host:'localhost',port:1234});
