/**
 * Shared Javascript functions, objects and other auxillary components that do not return JSX
 */

import { addToStore, initStore }  from '../actions';
import axios from 'axios';


/**
 * populateStore - generate Redux store data 
 * Populates the redux global store with random user data. Need an async function to ensure data arrives, ref: https://scotch.io/tutorials/asynchronous-javascript-using-async-await
 * before it is processed
 * See functional description for more detail
 */

async function populateStore(store) {
    
    // Random (or not so random) user data. Fancy names courtesy of https://www.fantasynamegenerators.com/roman_names.php
    const sampleUsernames = ["damir", "danielle", "muzaffar", "saida", "spurius", "titus", "mamercus", "faustus", "caius", "cassius"];
    const sampleNames = ["Damir Lampa", "Danielle Nicholson", "Muzaffar Shaikh", "Saida Barre", "Spurius Gavius Simplex", "Titus Blossius Processus", "Mamercus Betucius Belenus", "Faustus Cluilius Opilio", "Caius Opsius Valgus", "Cassius Clay"];
    const sampleSummaries = await genRandomPosts();
    
    const sharedPassword = "abc123";
    const sampleEmail = "noreply@samplesite.net";
    const newUsers = [];
    
    // Create an object that represents a new store entry that fits the design template. It's important to use the index looping rather than for..of
    // in order to use a single index to loop through several arrays. 
    for (let i = 0; i < sampleUsernames.length; i++) {
        const samplePostCount = 5; // Create 5 sample posts
        const samplePostArray = await genRandomPosts({ postCount: samplePostCount }); // Get the posts from API
        const samplePosts = []; // Array to which the sample posts for the user will be pushed

        // Each sample post includes a timestamp. samplePostObject consists of two keys, timestamp and postText. The object is stored inside an array samplePosts
        for (let postNum = 0; postNum < samplePostCount; postNum++) {
            const samplePostObject = { timestamp: genRandomDate({ start: new Date(Date.now() - 3 * 24 * 3600 * 1000) }), postText: samplePostArray[postNum]};
            samplePosts.push(samplePostObject);
        }

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
                    profilePicture: ("profilepic" + (i + 1).toString() + ".jpg"),
                    briefSummary: sampleSummaries[i]
                },
                posts: samplePosts
            }
        };
        newUsers.push(newUser);
    }

    return newUsers;
}

/**
 * genRandomPosts - generate random posts using Axios library and jsonplaceholder API (https://jsonplaceholder.typicode.com/guide.html)
 * @param {*} postCount : number of posts to fetch, default 10
 */
async function genRandomPosts({ postCount = 10 } = {}) {
    // Due to the nature of the API, we can either fetch 100 posts, or one post at a time. So a random number between 1 and 100 will be generated
    const returnArray = [];

    for (let i = 1; i <= postCount; i++) {
        // Use async/wait call to process API response. Ref. https://www.npmjs.com/package/axios
        const randomPostNumber = Math.floor(Math.random() * 99) + 1;
 
        const apiResponse = await axios.get("https://jsonplaceholder.typicode.com/posts/" + randomPostNumber.toString());
        returnArray.push(apiResponse.data.body);
    }

    return returnArray;
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