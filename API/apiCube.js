import store from '../redux/store'
import {URL_API} from '../types'
const API_URL = URL_API 

export function getRessourcesFromApi() {
    const url = API_URL + 'ressource/all';

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function getAllConversationsFromApi() {
    const state = store.getState()

    const token = state.auth.token;
    console.log('token', token);
    const userId = state.auth.account.id;
    

   

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
    const token = state.auth.token;
    const userId = state.auth.account.id;

    const url = API_URL + `echanges/messages/${userId}/${targetId}`;
    const data = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token, 
            'Content-Type': 'application/json'
        }
    }

    return fetch(url, data)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function getCommentsFromApi(idRessource) {
    const url = API_URL + 'echanges/comments/' + idRessource;

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function addComment(idRessource, content){
    const state = store.getState()
    const token = state.auth.token;
    const userId = state.auth.account.id;

    return fetch(API_URL + 'echanges/addComment', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, ressourceId: idRessource, content: content })
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}