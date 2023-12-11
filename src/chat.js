import { fetchSession, fetchUsers, fetchMessages } from "./services";
import { SERVER, CLIENT } from "./constants";
import state, {
  login,
  logout,
  setUsers,
  setMessages,
  setError,
  waitOnLogin,
} from "./state";
import render from "./render";
import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToSendMessage,
} from "./listeners";

// Main code
// This is where someone new to the code will see what happens on load
// You want to make it easy to see the big picture
// and easy to find the part you care about
// - Why did you come here? To fix a bug? Add a feature?
// - Make it easy to find the relevant code
// - skimmable

const appEl = document.querySelector("#app");

addAbilityToLogin({ state, appEl });
addAbilityToLogout({ state, appEl });
addAbilityToSendMessage({ state, appEl });

checkForSession();

function checkForSession() {
  fetchSession()
    .then((session) => {
      login(session.username);
      render({ state, appEl });
      return Promise.all([fetchUsers(), fetchMessages()]);
    })
    .catch((err) => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    })
    .then(([users, messages]) => {
      setUsers(users);
      setMessages(messages);
      render({ state, appEl });
    })
    .catch((err) => {
      if (err?.error == CLIENT.NO_SESSION) {
        logout();
        render({ state, appEl });
        return;
      }
      setError(err?.error || "ERROR");
      render({ state, appEl });
    });
}
