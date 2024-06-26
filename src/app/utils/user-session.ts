// utils/user-session.ts

// "Only for the Client Components"


const isUserLoggedIn = () => {
    if(typeof window !=='undefined') {
        const token = localStorage.getItem('accessToken');
        return !!token;

    }

};


export {isUserLoggedIn}