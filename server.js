const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const messages = require("./messages");
const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

// Sessions
app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;
  if (!users.isValid(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }
  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }
  const sid = sessions.addSession(username);
  users.addUserSession(sid, username);

  const onlineUsers = users.getOnlineUsers();
  const messageList = messages.getMessages();

  res.cookie("sid", sid);
  res.json({ onlineUsers, messageList });
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (sid) {
    res.clearCookie("sid");
  }
  if (username) {
    sessions.deleteSession(sid);
    users.removeSessionFromUser(sid, username); // Use removeSessionFromUser to disassociate sid from the user
  }
  res.json({ username });
});

//messages
app.get("/api/messages", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(messages.getMessages());
});

app.post("/api/messages", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  const { message } = req.body;
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  if (!message || !message.trim()) {
    res.status(400).json({ error: "required-message" });
    return;
  }
  messages.addMessage(username, message); // Adjust to use the correct parameters
  res.json(messages.getMessages());
});

//users
app.get("/api/users", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(users.getOnlineUsers());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
