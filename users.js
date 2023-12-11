const users = {};

function isEmptyUserData(username) {
  return !username || !username.trim() ;
}

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function addUserSession(sid,username){
  if(!users[username]){
    users[username] = [];
  }
  users[username].push(sid);
}

function removeSessionFromUser(sid,username){
  if(!users[username]||!users[username].includes(sid)){
    return;
  }
  users[username] = users[username].filter((session)=> session !== sid);
}

function getOnlineUsers(){
  const usersWithSessions = Object.entries(users).filter(
    ([_,sessions]) => sessions.length>0
  );
  return usersWithSessions.map(([username])=> username);
}

module.exports = {
  isValid,
  isEmptyUserData,
  addUserSession,
  removeSessionFromUser,
  getOnlineUsers,
};



