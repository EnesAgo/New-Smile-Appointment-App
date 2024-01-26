const redirectIfNotLoggedIn = (router) => {

    if(!sessionStorage.jwtNewSmile || sessionStorage.jwtNewSmile === ''){
        router.replace('/')
    }

}

export default redirectIfNotLoggedIn;
