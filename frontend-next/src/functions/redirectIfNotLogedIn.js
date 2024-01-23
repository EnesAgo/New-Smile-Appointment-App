const redirectIfNotLoggedIn = (router) => {

    if(!sessionStorage.jwtNewSmile){
        router.replace('/')
    }

}

export default redirectIfNotLoggedIn;
