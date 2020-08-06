/* Redux store Actions */

const addToStore = (userData) => {
    return (
        {
            type: "ADD_USERDATA_TO_STORE",
            payload: userData
        }
    );
}

const loginUser = (username) => {
    return (
        {
            type: "LOGIN_USER",
            payload: username
        }
    )
}

const logOffUser = (username) => {
    return (
        {
            type: "LOGOFF_USER",
            payload: username
        }
    )
}

export { addToStore, loginUser } ;