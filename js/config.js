/**
 * All constatn and varaible that define behaviors, lifes, styles, etc.
 * This file MUST be laoded before all other files that make use of it.
 */

const DEFAULT_DIFFICULTY = {
    easy: {
        playerLife: 100,
        enemyLife: 10,
        enemyMovRate: 15,
        enemyShootRate: 0.5
    },
    medium: {
        playerLife: 100,
        enemyLife: 1000,
        enemyMovRate: 10,
        enemyShootRate: 0.7
    },
    hard: {
        playerLife: 100,
        enemyLife: 2500,
        enemyMovRate: 5,
        enemyShootRate: 1
    },
    impossible: {
        playerLife: 100,
        enemyLife: 5000,
        enemyMovRate: 2,
        enemyShootRate: 1
    }
}

const DIFFICULTY =
    DEFAULT_DIFFICULTY[localStorage.getItem("game-difficulty")]
    || DEFAULT_DIFFICULTY.medium;

/**
 * GENERAL
 */
let IS_OVER = false;
const SCREEN_YOU_WON = document.querySelector("#js-you-won");
const SCREEN_YOU_LOST = document.querySelector("#js-you-lost");

/**
 * MOVEMENT
 */
const UP = -1;
const DOWN = 1;
const RIGHT = 1;
const LEFT = -1;
const AXIS_X = "__X__";
const AXIS_Y = "__Y__";
const DIRECTION_UP = "__UP__";
const DIRECTION_DOWN = "__DOWN__";
const DIRECTION_RIGHT = "__RIGHT__";
const DIRECTION_LEFT = "__LEFT__";

/**
 * HUD
 */
const BACKGROUND = document.querySelector("#js-background");
const PLAYER_LIFE_POINTS = document.querySelector("#js-player-life-points");
const ENEMY_LIFE_POINTS = document.querySelector("#js-enemy-life-points");
const POINTS_COUNTER = document.querySelector("#js-points-counter");
const LOSE_SCORE = document.querySelector("#js-you-lose-points");
const WON_SCORE = document.querySelector("#js-you-won-points");
const RETRY_BTN = document.querySelector("#js-retry-btn");
let PLAYER_POINTS = 0

/**
 * GAME FRAME
 */
const GAME_FRAME = document.querySelector("#js-game__frame");
const LIMITS_OFFSET = 5;
const LIMIT_TOP = 100 + LIMITS_OFFSET;
const LIMIT_BOTTOM = document.documentElement.clientHeight - LIMITS_OFFSET;
const LIMIT_RIGHT = window.innerWidth - LIMITS_OFFSET;
const LIMIT_LEFT = 0 + LIMITS_OFFSET;;

/**
 * PLAYER
 */
let PLAYER_IS_ALIVE = true;
let LIFE_PLAYER = DIFFICULTY.playerLife;
const PLAYER = document.querySelector("#js-player");
const PLAYER_VELOCITY = 25;
const PLAYER_EXTRA_DAMAGE = 0;

const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 70;
const PLAYER_HEIGHT_OFFSET = PLAYER_HEIGHT / 2;
const PLAYER_WIDTH_OFFSET = PLAYER_WIDTH / 2;

const INITIAL_POSITION_X_PLAYER = 50;
const INITIAL_POSITION_Y_PLAYER = (document.documentElement.clientHeight / 2) - PLAYER_HEIGHT_OFFSET;

/**
 * ENEMY
 */
let ENEMY_IS_ALIVE = true;
let LIFE_ENEMY = DIFFICULTY.enemyLife;
const ENEMY = document.querySelector("#js-enemy");
const ENEMY_BORDER = 400;
const ENEMY_MOVEMENT_RATE = DIFFICULTY.enemyMovRate; //10 = hard, 20 = medium, 50 = easy (5 very hard, 1 = impossible)
const ENEMY_VELOCITY = 75;
const SHOOT_RATE = DIFFICULTY.enemyShootRate; //Between 0 and 1

const ENEMY_HEIGHT = 170;
const ENEMY_WIDTH = 275;
const ENEMY_HEIGHT_OFFSET = ENEMY_HEIGHT / 2;
const ENEMY_WIDTH_OFFSET = ENEMY_WIDTH / 2;

const INITIAL_POSITION_X_ENEMY = window.innerWidth - 500;
const INITIAL_POSITION_Y_ENEMY = (document.documentElement.clientHeight / 2) - ENEMY_HEIGHT_OFFSET;

/**
 * BULLETS
 */
const BULLET_HEIGHT = 10;
const BULLET_WIDTH = 30;

/**
 * SOUNDS
 */
const SOUND_MANAGER = new SoundManager();
const SOUND_PLAYER_SHOOTS = 880; // A5
const SOUND_ENEMY_SHOOTS = 783.99; // G5
const SOUND_PLAYER_HURT = 440; // A4
const SOUND_ENEMY_HURT = 392; // G4