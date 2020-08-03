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
    switch (action.type)
    {
        case "ADD_USERDATA_TO_STORE":
            // Copy old array into a new one. 
            const storeSnapshot = Array.from(state);
            // Add new object to the array (validation happens outside reducer func.)
            storeSnapshot.push(action.payload);
            return storeSnapshot;
        default:
            return state;
    }
}

export default userDataReducer;
