export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.error) {
                throw data;
            }
            return data;
        });
}

export function fetchSession() {
    return fetch('/api/session')
        .then((r) => r.json())
        .then((data) => {
            if (data.error) {
                throw data;
            }
            return data;
        });
}

export function fetchUsers() {
    return fetch('/api/users')
        .then((r) => r.json())
        .then((data) => {
            if (data.error) {
                throw data;
            }
            return data;
        });
}

export function fetchMessages() {
    return fetch('/api/messages')
        .then((r) => r.json())
        .then((data) => {
            if (data.error) {
                throw data;
            }
            return data;
        });
}

export function fetchSendMessage(message) {
    return fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.error) {
                throw data;
            }
            return data;
        });
}

export function fetchLogout() {
    return fetch('/api/logout', {
        method: 'DELETE',
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.error) {
                throw data;
            }
            return data;
        });
}
