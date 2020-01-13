/**
 * This file manage general game logic, such as when
 * the player wins or loses.
 */

 /**
  * Show the GAME OVER screen when the player's life is 0.
  */
const youLost = () => {

    /**
     * Element for player's explosion asset.
     */
    const deadPlayer = document.createElement("span");
    deadPlayer.classList.add("player--explosion");

    /**
     * Spawns the asset on the last player's positon
     * before dead.
     */
    deadPlayer.style.top = `${state.player.y}px`;
    deadPlayer.style.left = `${state.player.x}px`;
    GAME_FRAME.appendChild(deadPlayer);

    /**
     * The player asset is remove form screen and
     * the GAME OVER screen is shown.
     */
    PLAYER.remove();
    LOSE_SCORE.innerHTML = `${PLAYER_POINTS} pts.`
    IS_OVER = true;
    SCREEN_YOU_LOST.style.display = "block";
    RETRY_BTN.style.display = "block";
}

 /**
  * Show the YOU WON screen when the enemy's life is 0.
  */
const youWon = () => {

    /**
     * Element for player's explosion asset.
     */
    const deadEnemy = document.createElement("span");
    deadEnemy.classList.add("enemy--explosion");

    /**
     * Spawns the asset on the last enemy's positon
     * before dead.
     */
    deadEnemy.style.top = `${state.enemy.y}px`;
    deadEnemy.style.left = `${state.enemy.x}px`;
    GAME_FRAME.appendChild(deadEnemy);

     /**
     * The enemy asset is remove form screen and
     * the YOU WON screen is shown.
     */
    ENEMY.remove();
    WON_SCORE.innerHTML = `${PLAYER_POINTS} pts.`
    IS_OVER = true;
    SCREEN_YOU_WON.style.display = "block";
    RETRY_BTN.style.display = "block";

    /**
     * Emit a glorious sound and get the previous scores
     * from the back-end server.
     */
    winningSound();
    showScores();
}

/**
 * This funcions set the adudio source to a 'winning sound'
 * stopping the music.
 */
const winningSound = () => {
    const src = document.querySelector("#music");
    src.src = "./music/winning.mp3";
    src.play();
}

/**
 * Makes a call to the back-end server in order to get the
 * previous scores from other sessions.
 */
const showScores = async () => {
    const scores = await getScores();
    const scoresList = document.querySelector("#js-scores");

    /**
     * Append each score as a table row in the scroes table
     * on the YOU WIN screen.
     */
    scores.forEach(score => {
        const row = document.createElement("tr");
        const colName = document.createElement("td");
        const colPoints = document.createElement("td");

        colName.innerHTML = score.name;
        colPoints.innerHTML = score.points;

        row.appendChild(colName);
        row.appendChild(colPoints);

        scoresList.appendChild(row);
    });
}

ticks.subscribe(tick => {

    /**
     * This prevents refreshing values when the
     * game is over.
     */
    if (IS_OVER) return false;

    /**
     * If the player's life is equal to 0,
     * the game is over independently if the
     * enemy's life is too or not.
     */
    if (LIFE_PLAYER <= 0) {
        PLAYER_IS_ALIVE = false;
        LIFE_PLAYER = 0;
        youLost();
    }

    /**
     * When the enemy's life reaches 0,
     * the player won.
     */
    if (LIFE_ENEMY <= 0) {
        ENEMY_IS_ALIVE = false;
        LIFE_ENEMY = 0;
        youWon();
    }

    /**
     * Updating the life point's of the player
     * and enemy.
     */
    PLAYER_LIFE_POINTS.innerHTML = LIFE_PLAYER;
    ENEMY_LIFE_POINTS.innerHTML = LIFE_ENEMY;

});