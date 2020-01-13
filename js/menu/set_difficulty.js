/**
 * In order to pass the difficulty from the Menu page
 * to the Game page, the data is store in the browser's
 * local storage.
 * 
 * @param {String} diff String that indicates wich level
 *                      of difficulty the users choosed.
 */

const setDifficulty = diff =>{
    window.localStorage.setItem("game-difficulty", diff);
}