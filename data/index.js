'use strict';
let fs = require('fs');
let path = require('path');
let _path = path.join(__dirname, './');

let data = {};

let patt = new RegExp('.json');
fs.readdirSync(_path).forEach(function(filename) {

    if (!patt.test(filename)) {
        return;
    }


    let _name = path.basename(filename, '.json');
    let _data = fs.readFileSync(path.join(_path, filename), 'utf8');

    try {
        data[_name] = JSON.parse(_data);
        console.log('Game Data Loaded:%s', _name);
    } catch (e) {
        console.log('Game Data Loaded Error:%s', _name);
        console.log(e);
    }

});
module.exports = data;
