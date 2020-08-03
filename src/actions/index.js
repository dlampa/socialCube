/* Redux store Actions */

const addToStore = (userData) => {
    return (
        {
            type: "ADD_USERDATA_TO_STORE",
            payload: userData
        }
    );
}

export default addToStore;