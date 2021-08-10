// local操作
const localData = function (method, name, obj) {
    switch (method) {
        case 'get':
            if (localStorage.getItem(name + '_obj')) {
                return JSON.parse(localStorage.getItem(name + '_obj'));
            } else if (localStorage.getItem(name + '_str')) {
                return localStorage.getItem(name + '_str');
            } else {
                return ''
            }
        case 'set':
            localData('remove', name);
            if (typeof obj == 'object') {
                localStorage.setItem(name + '_obj', JSON.stringify(obj));
            } else {
                localStorage.setItem(name + '_str', obj);
            }
            return true;
        case 'remove':
            localStorage.removeItem(name + '_obj');
            localStorage.removeItem(name + '_str');
            return true;
        case 'clear':
            localStorage.clear();
            return true;
    }
};

// session操作
const sessionData = function (method, name, obj) {
    switch (method) {
        case 'get':
            if (sessionStorage.getItem(name + '_obj')) {
                return JSON.parse(sessionStorage.getItem(name + '_obj'));
            } else if (sessionStorage.getItem(name + '_str')) {
                return sessionStorage.getItem(name + '_str');
            } else {
                return null
            }
        case 'set':
            sessionData('remove', name);
            if (typeof obj == 'object') {
                sessionStorage.setItem(name + '_obj', JSON.stringify(obj));
            } else {
                sessionStorage.setItem(name + '_str', obj);
            }
            return true;
        case 'remove':
            sessionStorage.removeItem(name + '_obj');
            sessionStorage.removeItem(name + '_str');
            return true;
        case 'clear':
            sessionStorage().clear();
            return true;
    }
};

export {localData, sessionData}