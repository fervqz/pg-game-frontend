/**
 * This file tries to detect is the player is in the same
 * position as the enemy. If so, the player's life is reduced.
 */

 /**
  * Checks if the area of the player (tall and wide) is collitioning
  * with the enemy's area.
  */
const isPlayerCollitioningWithEnemy = () => {
    if (state.player.x + PLAYER_WIDTH >= state.enemy.x
        && state.player.x <= state.enemy.x + ENEMY_WIDTH
        && state.player.y + PLAYER_HEIGHT > state.enemy.y
        && state.player.y <= state.enemy.y + ENEMY_HEIGHT) {
        return true
    }
}
/**
 * If they are collitioning, reduce player's life points.
 */
ticks.subscribe(time => {
    isPlayerCollitioningWithEnemy() ? reducePlayersLife() : false;
});

/**
 * Function that reduce player's life points.
 */
const reducePlayersLife = async () => {
    LIFE_PLAYER--;

    /**
     * Visual effect on life points.
     */
    await PLAYER_LIFE_POINTS.classList.remove("points");
    await PLAYER_LIFE_POINTS.classList.add("points");

    /**
     * Emit sound.
     */
    SOUND_MANAGER.playTone(SOUND_PLAYER_HURT);
}