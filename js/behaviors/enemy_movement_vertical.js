/**
 * This file makes the enemy move in the Y axis. It's movement is trigger by
 * an event generated from an interval created from the main time interval, ticks.
 */

(() => {

    /**
     * Interval that is trigger only in SOME ticks. The trigger rate depends on the
     * ENEMY_MOVEMENT_RATE. This variable is a number that divides the absolute ticks
     * generated from the beginning of the stream.
     * 
     * e.g: If ENEMY_MOVEMENT_RATE = 100, the enemy will only be moved when the
     * generated tick is a number divisible by 100. If the ticks are generated every
     * 50 milliseconds, the player will be moved every 20 ticks.
     */
    const enemyMovementTicks = ticks.filter(tick => tick % ENEMY_MOVEMENT_RATE === 0);

    /**
     * Stablishing the initial position on the X axis from a stream with previous
     * generated data.
     */
    const initVertical = Stream.of(INITIAL_POSITION_Y_ENEMY);

    /**
     * Predicates 
     */
    const isGoingUp = way => way === DIRECTION_UP;
    const isGoingDown = way => way === DIRECTION_DOWN;
    const isOnVerticalLimits = (newPostion) => newPostion + ENEMY_HEIGHT < LIMIT_BOTTOM && newPostion > LIMIT_TOP;

    /**
     * Choosing whether to move up or down. Each option has a 50% chance of occurring.
     */
    const enemyVerticalDirection = enemyMovementTicks.map(() => Math.random() <= 0.5 ? DIRECTION_UP : DIRECTION_DOWN);

    /**
     * Stablishing the movement direction and merging both options in one single Y movement stream.
     */
    const enemyUpMovement = enemyVerticalDirection.filter(isGoingUp).map(() => UP);
    const enemyDownMovement = enemyVerticalDirection.filter(isGoingDown).map(() => DOWN);
    const verticalMovement = Stream.merge(enemyUpMovement, enemyDownMovement);

    /**
     * Defining the movement velocity, negative for up, positive for down.
     */
    const verticalIncrement = verticalMovement.map(direction => ENEMY_VELOCITY * direction);

    /**
    * Assembling the initial data stream and the movement stream.
    * Then, it sums the increment of the movement with the previous
    * position.
    */
    const enemyVerticalPosition = Stream
        .merge(initVertical, verticalIncrement)
        .scan((currentPosition, increment) => {
            const newPostion = currentPosition + increment;
            return isOnVerticalLimits(newPostion) ? newPostion : currentPosition;
        }, 0);

    /**
    * Moving the elemnt of the enemy.
    */
    enemyVerticalPosition.subscribe(data => {
        state.enemy.y = data;

        /**
         * translate() has a sweeter movement than using top.
         */
        ENEMY.style.transform = `translate(${state.enemy.x}px, ${state.enemy.y}px)`;
    });
})()