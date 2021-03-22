import React from 'react'
import { useSelector } from 'react-redux'

export default function isAuth() {
    const isAuth = useSelector(state => state.isAuth);
    return isAuth;
} 