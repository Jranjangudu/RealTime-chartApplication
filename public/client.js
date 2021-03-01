const socket = io();
let name;
let obj;
do {
  name = prompt("Enter your name");
  document.getElementById("p").innerHTML = `Welcome back ${name} !`;
} while (!name);

let messgArea = document.querySelector(".message__area");
let sendArea = document.getElementById("send");

sendArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(msg) {
  obj = {
    name,
    message: msg,
  };
  appendMessage(obj, "outgoing");
  sendArea.value = "";
  // send your message to server
  socket.emit("msg", obj);
  scrollToBottom();
}
function appendMessage(message, type) {
  let mainDiv = document.createElement("div");

  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `<h4>${message.name}</h4>
   <p>${message.message}</p>
`;
  mainDiv.innerHTML = markup;
  messgArea.appendChild(mainDiv);
  scrollToBottom();
}

// receive message to server
socket.on("message", (mas) => {
  appendMessage(mas, "incoming");
});
function scrollToBottom() {
  messgArea.scrollTop = messgArea.scrollHeight;
}
