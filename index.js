'use strict';
let isDEV = process.env.NODE_ENV !== 'production';
let cfg = require('./config.json');
let mongoose = require('mongoose');
let data = require('./data');
let game = {
    cfg: cfg,
    data: data
};

if (isDEV) {
    cfg.db.mongodb.server = 'localhost';
}
mongoose.connect('mongodb://' + cfg.db.mongodb.server + '/' + cfg.db.mongodb.db, {
    user: cfg.db.mongodb.user,
    pass: cfg.db.mongodb.pass
});

let Storage = require('./storage')(mongoose);

let chara = new Storage.Charas();
chara.id = 1;
chara.gold = 1000;
chara.save();
