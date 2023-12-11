import { MESSAGES } from './constants';

const state = {
  // We store these as an object because we will access by id
  messages: [],
  users: {},
  isLoggedIn: false,
  isLoginPending: true, // We start with our login status unknown
  username: '',
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.todos = {};
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
  state.lastAddedTodoId = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.users = {};
  state.messages = [];
  state.error = '';
}

export function setMessages(messages) {
  state.messages = messages;
//   state.isTodoPending = false;
  state.error = '';
}

export function setUsers(users) {
  state.users = users;
//   state.isUserPending = false;
  state.error = '';
}

export function setError(error) {
  console.log(error);
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;

