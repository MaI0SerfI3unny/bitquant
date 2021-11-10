let socket = new WebSocket("ws://localhost:5001/ws/");

export const connectSocket = () => {
  socket.onopen = function(e) {
  alert("[open] Соединение установлено");
};
socket.onmessage = function(event) {
  alert(`[message] Данные получены с сервера: ${event}`);
  console.log(event.data);
};
}
