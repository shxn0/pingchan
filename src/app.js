const Config = require('./config');
const Ping = require('ping');
const emoji = require('node-emoji');

// /* expressでサーバ起動!!! */
// const express = require('express')
// const app = express()

// app.listen(3000, () => console.log('pingchan listening on port 3000!'))

/* ping 開始!!! */
const host = Config.HOST;

const pingLog = [];

function executePing(){
  Ping.promise.probe(host)
    .then(function (res) {
      let face = expressFace(res.time);
      console.log(`${res.host}: ${res.time.toFixed(2)} ${face}`);
      pingLog.unshift({
        hostName: res.host,
        time: Number(res.time.toFixed(2)),
        face: face,
        date: new Date().getTime()
      })
      if(pingLog.length > 10) pingLog.length = 10;
    });
}

setInterval(executePing, 1000);

// app.get('/pingchan', (req, res) => res.json(pingLog));
// app.use('/pingchan', express.static(__dirname+'/web'));

function expressFace(resTime){
  if (resTime <= Config.LEVEL1 ) return emoji.get('sunglasses');
  if (Config.LEVEL1 < resTime && resTime <= Config.LEVEL2) return emoji.get('innocent');
  if (Config.LEVEL2 < resTime && resTime <= Config.LEVEL3) return emoji.get('scream');
  if (Config.LEVEL3 < resTime && resTime <= Config.LEVEL4) return emoji.get('nauseated_face');
  if (Config.LEVEL4 < resTime ) return emoji.get('imp');
}