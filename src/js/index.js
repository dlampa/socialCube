/**
 * Shared Javascript functions, objects and other auxillary components that do not return JSX
 */


import addToStore from '../actions';

/**
 * populateStore: 
 * Populates the redux global store with random user data
 * See functional description for more detail
 */
function populateStore(store) {
    
    // Random (or not so random) user data
    const sampleUsernames = ["damir", "danielle", "muzaffar", "saida", "spurius", "titus", "mamercus", "faustus", "caius", "cassius"];
    const sampleNames = ["Damir Lampa", "Danielle Nicholson", "Muzaffar Shaikh", "Saida Barre", "Spurius Gavius Simplex", "Titus Blossius Processus", "Mamercus Betucius Belenus", "Faustus Cluilius Opilio", "Caius Opsius Valgus", "Cassius Clay"];
 
    const sharedPassword = "abc123";
    const sampleEmail = "noreply@samplesite.net";

    // Create an object that represents a new store entry that fits the design template.
    for (let i = 0; i < sampleUsernames.length; i++) {
        const newUser = {
            [sampleUsernames[i]]:
            {
                auth: {
                    password: sharedPassword,
                    isLoggedIn: false
                },
                profile: {
                    fullName: sampleNames[i],
                    emailAddress: sampleEmail,
                    birthday: genRandomDate({ returnEpoch: false, start: "1970-01-01 00:00:00" }),
                    profilePicture: "",
                    briefSummary: "load from API"
                },
                posts: [{ timestamp: genRandomDate(), postText: "load from API" }]
            }
        };
        store.dispatch(addToStore(newUser));
    }

}

/**
 * genRandomPosts - generate random posts using Axios library and jsonplaceholder API (https://jsonplaceholder.typicode.com/guide.html)
 * @param {*} postCount : number of posts to fetch
 */
function genRandomPosts({ postCount = 10 } = {}) {
    // Due to the nature of the API, we can either fetch 100 posts, or one post at a time. So a random number between 1 and 100 will be generated
    for (let i = 1; i <= postCount; i++) {

    }
}

/**
 * genRandomDate: creates a random date in chosen time period. All parameters are passed in form of object key: value pairs
 * @param {*} returnEpoch : if true, returned date will be JS epoch time otherwise ISO string representation of date
 * @param {*} start : custom start date, ISO format with time. Defaults to "2020-01-01 00:00:00"
 * @param {*} end : custom end date, ISO format with time. Defaults to Date.now()
 * 
 */
function genRandomDate({ returnEpoch = false, start = "2020-01-01 00:00:00", end = new Date(Date.now()) } = {}) {
    // Convert start timestamp from string to Date object
    start = new Date(start);
    // Convert end timestamp from string to Date object, if end is of type string (otherwise assume it's default - which is a date)
    end = end.constructor.name === "Date" ? end : new Date(end);

    const dateDiff = end.valueOf() - start.valueOf();
    // Take the difference (which is now in ms), multiply with a random number between 0 and 1 and add to start epoch time
    const newDate = new Date(start.valueOf() + Math.random() * dateDiff);
    
    // Return either the epoch time or object
    return (returnEpoch ? newDate.valueOf : newDate);
}

export { populateStore, genRandomDate };