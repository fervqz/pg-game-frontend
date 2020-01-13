/**
 * The purpose of this file is to detect collisions with
 * any enemy's bullet with the player or to detect if any
 * bullets is out of the screen.
 */

(() => {

    /**
     * Detects if the bullet's area (tall and wide) enters the player's
     * area, if so, it means they collided.
     * 
     * @param {float} top   Value of the top css rule of the bullet.
     * @param {float} left  Value of the left css rule of the bullet.
     */
    const hitsPlayer = (top, left) => {
        const adjustment = 20;
        if (left <= state.player.x + PLAYER_WIDTH
            && left > state.player.x
            && top >= state.player.y
            && top < state.player.y + PLAYER_HEIGHT + adjustment) {
            return true;
        }
        return false;
    }

    /**
     * Detects if the left value of the bullets y greater than the screen
     * limit, if so, the bullets got out of screen.
     * 
     * @param {float} left Value of the left css rule of the bullet.
     */
    const isOutOfScreen = left => {
        const bulletOffset = 50;
        return left <= LIMIT_LEFT + bulletOffset;
    }

    /**
     * Creates an element with the explosion asset as background, then it
     * is spawned in the position where the bullet and the player collided.
     * 
     * @param {float} top   Value of the top css rule of the bullet.
     * @param {float} left  Value of the left css rule of the bullet.
     */
    const createExplosion = (top, left) => {

        const explosion = document.createElement("span");
        explosion.classList.add("explosion");

        /**
         * Element spawned at collition position.
         */
        explosion.style.top = `${top}px`;
        explosion.style.left = `${left}px`;
        GAME_FRAME.appendChild(explosion);

        /**
         * The element it's deleted after some time
         * so the explosion does not appears over and
         * over again.
         */
        setTimeout(() => {
            explosion.remove();
        }, 1000);
    }

    /**
     * Detects if an enemy's bullets has hitted the player.
     * 
     * @param {Element} bullet  New bullets created.
     */
    const detectCollitions = async (bullet, i) => {
        const { top, left } = bullet.getBoundingClientRect();
        if (hitsPlayer(top, left)) {

            /**
             * Reduce Player's life and emit a hit sound.
             */
            LIFE_PLAYER -= Math.floor(Math.random() * 20) + 10;
            SOUND_MANAGER.playTone(SOUND_PLAYER_HURT);

            /**
             * Visual effect on life points.
             */
            await PLAYER_LIFE_POINTS.classList.remove("life-points-damage");
            await PLAYER_LIFE_POINTS.classList.add("life-points-damage");

            /**
             * Delete the bullet.
             */
            state.enemy.bullets.splice(i, 1);
            bullet.remove();

            /**
             * Creates an explosion when the bullet
             * hits the player.
             */
            createExplosion(top, left);
        } else if (isOutOfScreen(left)) {

            /**
             * if The bullet left the visible are, it is
             * deleted.
             */
            state.enemy.bullets.splice(i, 1);
            bullet.remove();
        }
    }

    ticks.subscribe(time => {

        /**
         * Detects the collitons for each bullet on the enemy's 
         * bullets array.
         */
        state.enemy.bullets.forEach((bullet, i) => {
            detectCollitions(bullet, i);
        });
    });
})()