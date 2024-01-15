// import React, { useState, createContext, useEffect } from "react";
// // import api from '../api/api'
//
// export const LoginContext = createContext()
//
// function isEmpty(obj) {
//     return Object.keys(obj).length === 0;
// }
//
// export const LoginContextProvider = props => {
//     const [isLogedIn, setIsLogedIn] = useState(false)
//
//     async function verifyToken() {
//         if(localStorage.jwt){
//             const user = JSON.parse(localStorage.getItem('jwt'));
//             try{
//
//                 const data = await api.get('/checktoken')
//
//
//                 if(data){
//                     setIsLogedIn(true)
//                     localStorage.setItem('jwt', JSON.stringify(data))
//                 }
//             }
//             catch(e){
//                 console.log(e)
//             }
//
//         }
//
//     }
//
//     useEffect(() => {
//
//         verifyToken()
//
//     }, [])
//
//
//     const data = {
//         logedin:[isLogedIn, setIsLogedIn]
//     }
//
//     return (
//         <LoginContext.Provider value={data}>
//             {props.children}
//         </LoginContext.Provider>
//     )
// }