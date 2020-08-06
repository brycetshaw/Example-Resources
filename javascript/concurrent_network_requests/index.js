// This is a script which makes concurrent network calls to a json api.
// It is summing up the number of games that ended in a draw in a given year.
// It makes calls for all scores which the game could be tied on
// On recieving the first page of results, it uses the total_pages attribute and
// makes requests to the rest of the results pages.

const fetch = require('node-fetch');

async function getNumOfGamesFromPage(year, goals, page){
    const queryStr = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1goals=${goals}&team2goals=${goals}&page=${page}`
    const response = await fetch(queryStr).catch(err => console.log("get error " + err.message));
    const json = await response.json();

    if (page ===0) {
        //For the page zero case, return array with data length and total # pages
        return [json.data.length, json.total_pages];
    } else {
        return json.data.length;
    }
}

async function getTiesCountByNumberOfGoals(year, goals) {
    //0. This function is applied to all element in the scores array.
    //1. we get the count from the first page of results, and the number of pages
    const [gamesOnFirstPage, numberOfPages] = await getNumOfGamesFromPage(year, goals, 0)

    //2. An array of pages is created, with the first page removed (to avoid making redundant network requests)
    const pageArray = Array.from(Array(numberOfPages).keys()).filter((e) => e !== 0)

    //4. Resolve the array of promises
    return Promise.all(
        //3.1 Concatenate the promise for first page count
        //3.2 with promises made out of http requests for the rest of the pages
        [gamesOnFirstPage].concat(pageArray.map(page =>getNumOfGamesFromPage(year, goals, page)))

        //5. get the sum of games counts for all pages (or 0 in the case that there are no results)
    ).then(data => data.reduce((x,y) => x + y, 0) || 0)
}


async function getNumDraws(year) {
    //Array of all the scores which the game could be tied on (0 to 10).
    const arrayOfScores = Array.from(Array(11).keys())

    // 1. Map array of scores -> array of promises for game counts
    // 2. Resolve array of promises to array of game counts
    // 3. Sum up the resolved array.
    return await Promise.all(arrayOfScores.map(item =>getTiesCountByNumberOfGoals(year, item)))
        .then(drawsCountForEachScore => {
        return drawsCountForEachScore.reduce((x, y) => x + y, 0)
    })
}


main();

async function main() {

    const year = 2014;
    const result = await getNumDraws(year);
    console.log(`In ${year}, a total of ${result} games ended in a draw`);
}
