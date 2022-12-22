// 参考にしたサイト
// https://blog.sarabande.jp/post/52050002245

const express = require('express');
const app = express();
const ports = 3003;

require('date-utils');

// https://qiita.com/atlansien/items/c587a0bf2f7f9022107c
// express.json()によって、req.body 経由でクライアントから送信されたデータを受け取る
//app.use(express.json())
// https://swallow-incubate.com/archives/blog/20190402
// resuest bodyのデフォルトサイズは100kbに設定されている
app.use(express.json({ extended: true, limit: '10mb' }))
//app.use(express.urlencoded({ extended: true }));

app.post('/log', (req, res) => {
  console.log(`== Object ==`);
  console.log(req.body);
  console.log("");
  console.log(`== String ==`);
  console.log(JSON.stringify(req.body, null, 2));
  const now = new Date();
  console.log(now.toFormat('YYYY年MM月DD日 HH24時MI分SS秒'));
  console.log("");

  //res.set('Content-Type', 'application/json');
  //let myanswer = JSON.stringify(req.body, null, 2);
  //// 置き換え
  //myanswer = myanswer.replace(/おはよう/gm, '富士山の標高は');
  //console.log(myanswer);
  //req.body = JSON.parse(myanswer);

  //res.json(req.body);
});


// HTTPS !!!
// https://reffect.co.jp/node-js/node-js-https
const https = require('https');
const fs = require('fs');
// https://qiita.com/MahoTakara/items/71977be2d18405fe7339
// % openssl req -x509 -newkey rsa:2048 -keyout privatekey.pem -out cert.pem -nodes -days 3650
const sslopt = {
  key:  fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./cert.pem'),
};
const server = https.createServer(sslopt, app);
server.listen(ports);
console.log(`${ports} is https`);

