/**
 * The purpose of this file is to detect collisions with
 * any player's bullet with the enemy or to detect if any
 * bullets is out of the screen.
 */

(() => {

    /**
     * Detects if the bullet's area (tall and wide) enters the enemy's
     * area, if so, it means they collided.
     * 
     * @param {float} top   Value of the top css rule of the bullet.
     * @param {float} left  Value of the left css rule of the bullet.
     */
    const hitsEnemy = (top, left) => {
        if (left >= state.enemy.x
            && left < state.enemy.x + ENEMY_WIDTH
            && top >= state.enemy.y
            && top < state.enemy.y + ENEMY_HEIGHT) {
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
        const bulletOffset = 150;
        return left > (LIMIT_RIGHT - bulletOffset);
    }

    /**
     * Creates an element with the explosion asset as background, then it
     * is spawned in the position where the bullet and the enemy collided.
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

        /**
         * The element it's deleted after some time
         * so the explosion does not appears over and
         * over again.
         */
        GAME_FRAME.appendChild(explosion);
        setTimeout(() => {
            explosion.remove();
        }, 1000);
    }

    /**
     * This functions calculates a point increment based on
     * the damage made to the enemy.
     * 
     * @param {int} damage Damage of the palyers bullet.
     */
    const updatePlayerPoints = async damage => {
        PLAYER_POINTS += damage * 100;
        IS_OVER ? null : POINTS_COUNTER.innerHTML = `${PLAYER_POINTS}`;

        /**
        * Visual effect on player's points.
        */
        await POINTS_COUNTER.classList.remove("points-increment");
        await POINTS_COUNTER.classList.add("points-increment");
    }

    /**
     * Detects if an player's bullets has hitted the enemy.
     * 
     * @param {Element} bullet  New bullets created.
     */
    const detectCollitions = async (bullet, i) => {
        const { top, left } = bullet.getBoundingClientRect();
        if (hitsEnemy(top, left)) {

            /**
             * Reduce Enemy's life by a random number between 10 and 20.
             */
            const damage = Math.floor(Math.random() * 20) + 10 + PLAYER_EXTRA_DAMAGE;
            LIFE_ENEMY -= damage;

            /**
             * Emit a sound when the player hits the enemy.
             */
            SOUND_MANAGER.playTone(SOUND_ENEMY_HURT);

            /**
             * Visual effect on life points.
             */
            await ENEMY_LIFE_POINTS.classList.remove("life-points-damage");
            await ENEMY_LIFE_POINTS.classList.add("life-points-damage");

            /**
             * Delete the bullet.
             */
            state.player.bullets.splice(i, 1);
            bullet.remove();

            /**
             * Creates an explosion when the bullet
             * hits the player.
             */
            createExplosion(top, left);

            /**
             * Updates the points counter on the HUD.
             */
            updatePlayerPoints(damage);

        } else if (isOutOfScreen(left)) {

            /**
             * if The bullet left the visible are, it is
             * deleted.
             */
            state.player.bullets.splice(i, 1);
            bullet.remove();
        }
    }

    ticks.subscribe(time => {

        /**
         * Detects the collitons for each bullet on the player's 
         * bullets array.
         */
        state.player.bullets.forEach((bullet, i) => {
            detectCollitions(bullet, i);
        });
    });
})()