function render({ state, appEl }) {
  const html = `
    ${generateLoginHtml(state)}
    ${generateChatPageHtml(state)}
  `;
  appEl.innerHTML = html;
}

function generateChatPageHtml(state) {
  // if (state.error) {
  //   return `<p class="error">${state.error}</p>`;
  // }

  if (!state.isLoggedIn) {
    return "";
  }

  return `<section class="chat-page">
  ${generateUsersHtml(state)}
  ${generateChatsHtml(state)}
  ${generateAddHtml()}
</section>`;
}

function generateUsersHtml(state) {
  return (
    `<ol class="users">` +
    Object.values(state.users)
      .map(
        (user) =>
          `<li class="user">
          <span class="username">${user}</span>
        </li>`
      )
      .join("") +
    `
      <li class="user-item">
        <button type="button" class="logout">Logout</button>
      </li>
    </ol>`
  );
}

function generateChatsHtml(state) {
  return (
    `<ol class="messages">` +
    Object.values(state.messages)
      .map(
        (message) => `
      <li class="message">
        <i class="user-icon"></i>
        <div class="message-info">
          <span class="message-sender"> sender: ${message.sender}</span>
          <p class="message-text">text: ${message.text}</p>
        </div>
      </li>`
      )
      .join("") +
    `</ol>`
  );
}

function generateAddHtml() {
  return `
        <form class="message-send__form" action="#/add">
          <input class="message-send__input">
          <button type="submit" class="add__button">Send</button>
        </form>
  `;
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `;
  }
  if (state.isLoggedIn) {
    return ``;
  }
  return `
      <div class="login">
        <form class="login-form" action="#/login">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" class="login__username" placeholder="Enter your username"/>
            <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

export default render;
