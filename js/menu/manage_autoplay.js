/**
 * In order to make the music sound, the browser requires
 * an previous interaction from the user to the application.
 * This prevents the application to reproduce media without
 * the users consent. In this case, the interaction is created
 * when the user clicks the 'ACCEPT' button on the modal in
 * Menu page.
 */

(() => {

    const modal = document.querySelector("#js-modal");
    const acceptAudio = document.querySelector("#js-accept-audio");

    /**
     * Focusing the button so the users can hit enter.
     */
    acceptAudio.focus();

    /**
     * When the user 'interacts' with the app, the browser
     * now allows to play media.
     */
    acceptAudio.addEventListener("click", () => {

        /**
         * Media play, interaction already done when entering
         * to this handler.
         */
        document.querySelector('#music').play();

        /**
         * Hides the modal.
         */
        modal.style.display = "none";
    });
})();