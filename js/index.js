/**
 * The purpose of this file is to import
 * dinamically all the script needed for
 * the game in order to run.
 */

const body = document.querySelector("body");

/**
 * List of all required scripts.
 */
const scripts = [

    "./js/config.js",
    "./js/hud/background.js",
    "./js/state.js",
    "./js/ticks.js",

    "./js/behaviors/player_movement.js",
    "./js/behaviors/player_shoots.js",
    "./js/behaviors/enemy_movement_horizontal.js",
    "./js/behaviors/enemy_movement_vertical.js",
    "./js/behaviors/enemy_shoots.js",

    "./js/collisions/player_bullets.js",
    "./js/collisions/enemy_bullets.js",
    "./js/collisions/player_enemy.js",
    
    "./js/game_manager/manger.js",
    "./js/game_manager/retry.js",

];

/**
 * Scripts importation.
 */
scripts.forEach( async path => {
    const scriptTag = document.createElement("script");
    scriptTag.src = path;
    await body.appendChild(scriptTag);
});