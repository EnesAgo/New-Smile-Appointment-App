const redirectIfNotLoggedIn = (router) => {

    if(!localStorage.jwtNewSmile){
        router.replace('/')
    }

}

export default redirectIfNotLoggedIn;
