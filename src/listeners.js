import render from "./render";

import { fetchLogin, fetchSendMessage } from "./services";

import { login, logout, setUsers, setMessages } from "./state";

export function addAbilityToLogin({ state, appEl }) {
  appEl.addEventListener("submit", (e) => {
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    e.preventDefault();
    const username = appEl.querySelector("#username").value;
    fetchLogin(username)
      .then(({ onlineUsers, messageList }) => {
        login(username);
        setUsers(onlineUsers);
        setMessages(messageList);
        console.log(messageList);
        render({ state, appEl });
      })
      .catch((err) => {
        logout();
        render({ state, appEl });
      });
  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("logout")) {
      return;
    }
    logout();
    render({ state, appEl });
  });
}

export function addAbilityToSendMessage({ state, appEl }) {
  appEl.addEventListener("submit", (e) => {
    if (!e.target.classList.contains("message-send__form")) {
      return;
    }
    e.preventDefault();
    const message = e.target.querySelector(".message-send__input").value;

    fetchSendMessage(message)
      .then((messages) => {
        setMessages(messages);
        render({ state, appEl });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        render({ state, appEl });
      });
  });
}
