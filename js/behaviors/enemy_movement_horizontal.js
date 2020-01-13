/**
 * This file makes the enemy move in the X axis. It's movement is trigger by
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
    const initHorizontal = Stream.of(INITIAL_POSITION_X_ENEMY);

    /**
     * Predicates 
     */
    const isGoingRight = way => way === DIRECTION_RIGHT;
    const isGoingLeft = way => way === DIRECTION_LEFT;
    const isOnHorizontalLimits = (newPostion) => newPostion + ENEMY_WIDTH < LIMIT_RIGHT && newPostion > LIMIT_LEFT + ENEMY_BORDER;
    
    /**
     * Choosing whether to move right or left. Each option has a 50% chance of occurring.
     */
    const enemyHorizontalDirection = enemyMovementTicks.map(() => Math.random() <= 0.5 ? DIRECTION_RIGHT : DIRECTION_LEFT);

    /**
     * Stablishing the movement direction and merging both options in one single X movement stream.
     */
    const enemyRightMovement = enemyHorizontalDirection.filter(isGoingRight).map(() => RIGHT);
    const enemyLeftMovement = enemyHorizontalDirection.filter(isGoingLeft).map(() => LEFT);
    const horizontalMovement = Stream.merge(enemyRightMovement, enemyLeftMovement);

    /**
     * Defining the movement velocity, negative for left, positive for right.
     */
    const horizontalIncrement = horizontalMovement.map(direction => ENEMY_VELOCITY * direction);

    /**
     * Assembling the initial data stream and the movement stream.
     * Then, it sums the increment of the movement with the previous
     * position.
     */
    const enemyHorizontalPosition = Stream
        .merge(initHorizontal, horizontalIncrement)
        .scan((currentPosition, increment) => {
            const newPostion = currentPosition + increment;
            return isOnHorizontalLimits(newPostion) ? newPostion : currentPosition;
        }, 0);

        /**
         * Moving the elemnt of the enemy.
         */
    enemyHorizontalPosition.subscribe(data => {
        state.enemy.x = data;

        /**
         * translate() has a sweeter movement than using left.
         */
        ENEMY.style.transform = `translate(${state.enemy.x}px, ${state.enemy.y}px)`;
    });
})()