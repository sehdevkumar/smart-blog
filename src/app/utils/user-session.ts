// utils/user-session.ts


// "Only for the Client Components"

const _solutionName = '__smartblog__';
const _sessionPrefix = '__userSession__';

export type UserSessionResponse = {
    refreshToken: string;
    accessToken: string;
}

export type UserSolution = {
    _solutionName: string;
    _sessionPrefix: string;
}

const UserSolution: UserSolution = {
    _solutionName,
    _sessionPrefix,
}

const getUserInfo = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    const token = localStorage.getItem(UserSolution._sessionPrefix);
    if (!token) {
        return null;
    }

    try {
        const { accessToken } = JSON.parse(token) as UserSessionResponse;
        // parse the JWT accessToken to get user info
        const payload = JSON.parse(atob(accessToken?.split('.')[1] ?? ''));
        return {
            email: payload.email,
            name: payload.name,
        };
    } catch (error) {
        console.error("Failed to parse token:", error);
        return null;
    }
}

const isUserLoggedIn = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(UserSolution._sessionPrefix);
        return !!token;
    }
    return false;
};

const removeUserSession = () => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.removeItem(UserSolution._sessionPrefix);
    localStorage.removeItem(UserSolution._solutionName);
}

const setUserSession = (response: UserSessionResponse) => {
    if (typeof window === 'undefined') {
        return;
    }

    removeUserSession();
    localStorage.setItem(UserSolution._sessionPrefix, JSON.stringify(response));
    localStorage.setItem(UserSolution._solutionName, _solutionName);
}


const getAccessToken = ()=> {
    
    const data = localStorage.getItem(UserSolution._sessionPrefix);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const parsed = JSON.parse(data as any) as UserSessionResponse;

    return parsed.accessToken;
    

}

const getRefreshToken = () => {

    const data = localStorage.getItem(UserSolution._sessionPrefix);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const parsed = JSON.parse(data as any) as UserSessionResponse;

    return parsed.accessToken;


}

export { isUserLoggedIn, setUserSession, removeUserSession, getUserInfo, getAccessToken, getRefreshToken };
