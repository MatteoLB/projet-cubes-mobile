import store from '../Store/configureStore.js'

const API_URL = 'http://192.168.0.14:3000/api/';

export function getRessourcesFromApi() {
    const url = API_URL + 'ressource/all';

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function getAllConversationsFromApi() {
    const state = store.getState()
    const userId = state.account.id;
    const token = state.token;

    const url = API_URL + 'echanges/conversations/'+userId;
    const data = {
        method: 'GET',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    }

    return fetch(url, data)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function getOneConversationFromApi(targetId) {
    const state = store.getState()
    const userId = state.account.id;
    const token = state.token;

    const url = API_URL + `echanges/messages/${userId}/${targetId}`;
    const data = {
        method: 'GET',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json'
        }
    }

    return fetch(url, data)
        .then(response => response.json())
        .catch(error => console.log(error));
}