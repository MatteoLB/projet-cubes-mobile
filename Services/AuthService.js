import React from 'react'
import { useSelector } from 'react-redux'

export function isAuth() {
    const isAuth = useSelector(state => state.isAuth);
    return isAuth;
} 

export function getTokenAndIdUser() {
    const isAuth = useSelector(state => state.isAuth);
    const idUser = useSelector(state => state.account.id);
    const token = useSelector(state => state.token);

    return {
        isAuth: isAuth,
        idUser: idUser,
        token: token
    };
}