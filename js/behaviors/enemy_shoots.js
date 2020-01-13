/**
 * The enemy can only shoot when it just moved.
 * 
 * @param {int} reference Absolute time reference from ticks.
 */
const canEnemyShoot = reference =>
    reference % ENEMY_MOVEMENT_RATE === 0
    && Math.random() < SHOOT_RATE;

/**
 * Stream that receives data when the canEnemyShoot()
 * function decides wheter it can shoot or not.
 */
const enemyShootsTicks = ticks.filter(canEnemyShoot);

enemyShootsTicks.subscribe(data => {

    /**
     * Checking if the enemy is still alive.
     */
    if (!ENEMY_IS_ALIVE) return false;

    /**
     * This is the bullet element.
     */
    const bullet = document.createElement("div");
    bullet.classList.add("bullet--enemy");

    /**
     * Spawning the shoot in the enemy's position.
     */
    bullet.style.left = `${state.enemy.x}px`;
    bullet.style.top = `${state.enemy.y + (ENEMY_HEIGHT / 2) - BULLET_HEIGHT}px`;

    /**
     * Adding the shoot to the board and the enemy's bullet array.
     */
    GAME_FRAME.appendChild(bullet);
    state.enemy.bullets.push(bullet);

    /**
     * Play a tone when the enemy just shooted.
     */
    SOUND_MANAGER.playTone(SOUND_ENEMY_SHOOTS);
});