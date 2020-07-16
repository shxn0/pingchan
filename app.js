const Config = require('./config');
const Ping = require('ping');
const emoji = require('node-emoji');

/* ping 開始!!! */
const host = Config.HOST;

const pingLog = [];

function ping(){
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
    })
    .catch((err) => {
      console.log(Config.ERROR);
    });
}

setInterval(ping, Config.INTERVAL);

function expressFace(resTime){
  if (resTime <= Config.LEVEL1 ) return emoji.get('sunglasses');
  if (Config.LEVEL1 < resTime && resTime <= Config.LEVEL2) return emoji.get('innocent');
  if (Config.LEVEL2 < resTime && resTime <= Config.LEVEL3) return emoji.get('scream');
  if (Config.LEVEL3 < resTime && resTime <= Config.LEVEL4) return emoji.get('nauseated_face');
  if (Config.LEVEL4 < resTime ) return emoji.get('imp');
}