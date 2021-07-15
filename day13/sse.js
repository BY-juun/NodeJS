const SSE = require('sse');

module.exports = (server) => {
  const sse = new SSE(server);
  sse.on('connection', (client) => { // 서버센트이벤트 연결
    setInterval(() => {
      client.send(Date.now().toString()); //주기적으로 시간을 보내줌, 문자열만 보내줄 수 있음.
    }, 1000);
  });
};