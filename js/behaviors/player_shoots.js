/**
 * When the space bar is pressed, a bullet should
 * be spawned.
 */
const bulletKeysDown = new Stream(event => {
    document.addEventListener("keydown", event);
});

/**
 * Predicated that verifies if the key pressed
 * is the space bar.
 * 
 * @param {String} event 'keydown' event.
 */
const isSpaceKey = event => event.code === "Space";

/**
 * Trigger when only the space bar key is pressed.
 */
const keySpace = bulletKeysDown.filter(isSpaceKey);

keySpace.subscribe(() => {

    /**
     * Checking if the player is still alive.
     */
    if (!PLAYER_IS_ALIVE) return false;

    /**
     * This is the bullet element.
     */
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");

    /**
     * Spawning the shoot in the player's position.
     */
    bullet.style.left = `${state.player.x + PLAYER_WIDTH}px`;
    bullet.style.top = `${state.player.y + PLAYER_HEIGHT / 2}px`;

    /**
     * Adding the shoot to the board and the player's bullet array.
     */
    GAME_FRAME.appendChild(bullet);
    state.player.bullets.push(bullet);

    /**
     * Play a tone when the player just shooted.
     */
    SOUND_MANAGER.playTone(SOUND_PLAYER_SHOOTS);
});