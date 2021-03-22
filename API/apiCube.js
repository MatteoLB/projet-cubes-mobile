
export function getRessourcesFromApi() {
    const url = 'http://192.168.0.14:3000/api/ressource/all';

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}