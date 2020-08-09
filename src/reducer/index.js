/* Redux reducer function 

Data structure ref. document "Site React component breakdown.pdf"

[ ... , 
    {
        username: 
        { 
            auth: {
                password: string "password",
                isLoggedIn: bool
            },
            profile: {
                fullName: string,
                emailAddress: validator(string),
                birthday: string,
                profilePicture: url string,
                briefSummary: string
            },
            posts: [ {timestamp: random Date(), postText: string}, ...]

    },
...
]

*/

const userDataReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_USERDATA_TO_STORE":
            // Copy old array into a new one. 
            const storeSnapshot = Array.from(state);
            // Add new object to the array (validation happens outside reducer func.)
            for (let payloadItem of action.payload) {
                storeSnapshot.push(payloadItem);
            }
            return storeSnapshot;

        case "LOGIN_USER":
            const returnLoginArray = state.map(userObject => {
                let [user,] = Object.keys(userObject);
                if (user === action.payload) {
                    // Extract everything except what we want changed from the state for the target user
                    let { [user]: userObjectData } = userObject;
                    userObjectData.auth.isLoggedIn = true;
                    return { [user]: userObjectData };
                } else {
                    return userObject;
                }
            });

            return returnLoginArray;
        
        case "LOGOFF_USER":
            const returnLogOffArray = state.map(userObject => {
                let [user,] = Object.keys(userObject);
                if (user === action.payload) {
                    // Extract everything except what we want changed from the state for the target user
                    let { [user]: userObjectData } = userObject;
                    userObjectData.auth.isLoggedIn = false;
                    return { [user]: userObjectData };
                } else {
                    return userObject;
                }
            });

            return returnLogOffArray;
        
        default:
            return state;
    }
}

export default userDataReducer;
