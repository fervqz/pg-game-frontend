/**
 * This file makes all the request to the back-end using fetch.
 */

const SERVER_IP = "http://localhost:9002";

/**
 * This functions fetches the players scores previousli stored.
 * 
 * @return {Array}  scores  Array of scores.
 */
const getScores = async () => {

    /**
     * method: GET
     * mode: CORS
     */
    const scores = await fetch(`${SERVER_IP}/get-scores`,
        {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(res => res.scores);

    return scores;
}

/**
 * This funciton send the name and the score from a player
 * to the back-end in order to be fetches in the future.
 * 
 * @param {String} name Name of the player.
 */
const saveScore = name => {

    /**
     * Parsing the data before send it.
     */
    const score = {
        name,
        points: parseInt(POINTS_COUNTER.textContent)
    };

    /**
     * The data is passed as the request's body.
     * 
     * method: POST
     * mode: CORS
     */
    fetch(`${SERVER_IP}/save-scores`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(score)
    });

}