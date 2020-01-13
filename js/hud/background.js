/**
 * This file generates all the visual effects
 * of the background for the Menu and Game pages.
 * The background consist of three layers:
 * 
 * 1- Close asteroids.
 * 2- Middle stars.
 * 3- Far shiny stars.
 */

 /**
  * This code generates all three types of baground assets.
  */
(() => {

    /**
     * Total number of stars and asteroids to generate.
     * CAUTION: A high number (such as 1000) may cause low
     * performance.
     */
    const asteroids = 150;

    /**
     * Dividing the 100% of the assets to generate into different
     * subsets.
     */
    for (let i = 0; i < asteroids; i++) {
        let styleClass = "asteroid--close"
        if (i > ((asteroids / 6) * 4)) {
            styleClass = "asteroid--far"
        } else if (i > ((asteroids / 6) * 1)) {
            styleClass = "asteroid--middle"
        }


        /**
         * Creating the asset's elemnt.
         */
        const asteroid = document.createElement("span");
        asteroid.classList.add("background__asteroid");
        asteroid.classList.add(styleClass);
        BACKGROUND.appendChild(asteroid);

        /**
         * Moving the asset on a random position. The initial position
         * many asteroids and stars is out of screen, this makes the
         * assets to appear from right and creating illusion of movement.
         */
        asteroid.style.top = `${Math.random() * window.innerHeight}px`;
        asteroid.style.right = `${Math.random() * window.innerHeight * 3}px`;
    }

})()