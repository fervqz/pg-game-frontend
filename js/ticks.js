/**
 * This is the main reference of time. Many streams are
 * created from this one, but with different frequencies.
 * A stream created from this stream can not have a minor
 * period of the interval. This streams increment in 1 on
 * each tick.
 */

const TIME_REFERENCE = 1;
const PERIOD = 50;

const ticks = new Stream(next => {
    setInterval(() => next(TIME_REFERENCE), PERIOD);
}).scan(((current, increment) => current + increment), 0);