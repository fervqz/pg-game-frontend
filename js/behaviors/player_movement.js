/**
 * This file makes the player move on the X and Y axes. The player can only
 * move on one axis at a time. The code recognizes the arrows keys and A, W,
 * S and D as movement keys. The player is moved based on it's top and left
 * CSS rules, this means that a positive top value will move it down, a negative
 * top value will move it up, a positive left value will move it right and a
 * negative left value will move it right, since the value represents the 
 * distance from that property.
 */

(() => {

    /**
     * Predicates.
     */
    const isUpKey = event => event.code === "ArrowUp" || event.code === "KeyW";
    const isDownKey = event => event.code === "ArrowDown" || event.code === "KeyS";
    const isRightKey = event => event.code === "ArrowRight" || event.code === "KeyD";
    const isLeftKey = event => event.code === "ArrowLeft" || event.code === "KeyA";
    const isOnVerticalLimits = (newPostion) => newPostion + PLAYER_HEIGHT < LIMIT_BOTTOM && newPostion > LIMIT_TOP;
    const isOnHorizontalLimits = (newPostion) => newPostion + PLAYER_WIDTH < LIMIT_RIGHT && newPostion > LIMIT_LEFT;

    /**
     * Listen when the user presses any key.
     */
    const playerKeysDown = new Stream(event => {
        document.addEventListener("keydown", event);
    });

    /**
     * Create four new streams (one for each direction) and return it's value
     * (positive for down and right or negative for up and left).
     */
    const keyUp = playerKeysDown.filter(isUpKey).map(() => UP);
    const keyDown = playerKeysDown.filter(isDownKey).map(() => DOWN);
    const keyRight = playerKeysDown.filter(isRightKey).map(() => RIGHT);
    const keyLeft = playerKeysDown.filter(isLeftKey).map(() => LEFT);

    /**
     * Based on the four directions streams, create two new streams for each axis.
     * Horizontal Movement will have right and left streams.
     * Vertical Movement will have up and down streams.
     */
    const verticalMovement = Stream.merge(keyUp, keyDown);
    const horizontalMovement = Stream.merge(keyRight, keyLeft);

    /**
     * Stablishing the initial position on the X and Y axes from two new streams 
     * with previous generated data.
     */
    const initVertical = Stream.of(INITIAL_POSITION_Y_PLAYER);
    const initHorizontal = Stream.of(INITIAL_POSITION_X_PLAYER);

    /**
     * Vertical player movement.
     * Defining the movement velocity for the Y axis, negative for up, positive for down.
     */
    const verticalIncrement = verticalMovement.map(direction => PLAYER_VELOCITY * direction);

    /**
     * Assembling the initial Y data stream and the vertical movement stream.
     * Then, it sums the increment of the movement with the previous position.
     * At last, the value is re-formatted in order to include from wich axis
     * stream comes from.
     */
    const playerVerticalPosition = Stream
        .merge(initVertical, verticalIncrement)
        .scan((currentPosition, increment) => {
            const newPostion = currentPosition + increment;
            return isOnVerticalLimits(newPostion) ? newPostion : currentPosition;
        }, 0)
        .map(value => {
            return {
                axis: AXIS_Y,
                value
            }
        });

    /**
     * Horizontal player movement.
     * Defining the movement velocity for the Y axis, negative for up, positive for down.
     */
    const horizontalIncrement = horizontalMovement.map(direction => PLAYER_VELOCITY * direction);

    /**
     * Assembling the initial X data stream and the horizontal movement stream.
     * Then, it sums the increment of the movement with the previous position.
     * At last, the value is re-formatted in order to include from wich axis
     * stream comes from.
     */
    const playerHorizontalPosition = Stream
        .merge(initHorizontal, horizontalIncrement)
        .scan((currentPosition, increment) => {
            const newPostion = currentPosition + increment;
            return isOnHorizontalLimits(newPostion) ? newPostion : currentPosition;
        }, 0)
        .map(value => {
            return {
                axis: AXIS_X,
                value
            }
        });

    /**
     * Both streams are merge unifying it in a single movement stream in two axes.
     */
    const playerMovement = Stream.merge(playerVerticalPosition, playerHorizontalPosition);

    playerMovement.subscribe(data => {

        /**
         * If the is moving vertically.
         */
        if (data.axis === AXIS_Y) state.player.y = data.value

        /**
         * If the is moving horizontally.
         */
        else if (data.axis === AXIS_X) state.player.x = data.value;

        /**
         * Player's position updating.
         */
        PLAYER.style.transform = `translate(${state.player.x}px, ${state.player.y}px)`;
    });
})()