'use strict';
const isDEV = process.env.NODE_ENV !== 'production';
const cfg = require('./config.json');
const mongoose = require('mongoose');
const data = require('./data');
const io = require('socket.io')(4321);
let moment = require('moment');
const login_timeout = 5;
let game = {
    cfg: cfg,
    data: data
};
let login = {};
if (isDEV) {
    cfg.db.mongodb.server = 'localhost';
}
mongoose.connect('mongodb://' + cfg.db.mongodb.server + '/' + cfg.db.mongodb.db, {
    user: cfg.db.mongodb.user,
    pass: cfg.db.mongodb.pass
});

let Storage = require('./storage')(mongoose);
/*
let chara = new Storage.Charas();
chara.id = 1;
chara.gold = 1000;
chara.save();
*/


io.on('connection', function(socket) {
    let chara = null;

    socket.on('login', (data) => {
        if (chara) {
            return;
        }

        if (!data || !data.login_id || !login[data.login_id]) {
            showError('請先登入');
            socket.disconnect();
            return;
        } else {
            let _id = login[data.login_id].id;
            //delete login[data.login_id];

            Storage.Charas.findOne({ id: _id }, function(err, _chara) {
                if (err) {
                    console.log(err);
                    showError('找不到該帳號');
                    socket.disconnect();
                    return;
                }
                if (!_chara) {
                    socket.emit('regist');
                    return;
                }
                chara = _chara;
                socket.emit('chara', chara);
            });
        }
    });
    socket.on('create login id', (data) => {
        login[data.login_id] = {
            id: data.id,
            create_at: moment()
        };
        console.log(login);
    });
    socket.on('regist', (data) => {

    });
    socket.on('disconnect', (data) => {

    });

    function showError(message) {
        socket.emit('error', { message: message });
    }

});

function clearTimeOut() {
    for (const i in login) {
        if (moment().diff(login[i].create_at, 'seconds') > login_timeout) {
            console.log('delete temp login:%s', i);
            delete login[i];
        }
    }
}

setInterval(() => { clearTimeOut(); }, 1000);
