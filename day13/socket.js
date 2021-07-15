  
const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  io.on('connection', (socket) => { // 웹 소켓 연결 시
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer.split('/')[referer.split('/').length - 1];
    socket.join(roomId); //경매방 참가
    socket.on('disconnect', () => {
      socket.leave(roomId); //경매방 나가기
    });
  });
};