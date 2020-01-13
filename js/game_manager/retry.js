/**
 * When the player decides to retry the game,
 * the score obtained is sent to the back-end
 * server and the page is reloaded.
 */

RETRY_BTN.addEventListener("click", async () => {

    /**
     * Asking for the name to be asociated with
     * the session score.
     */
    let name = prompt("Please enter your name:");
    if (name == null || name == "") {
        name = "Player";
    }

    /**
     * Saving the score. The player will see
     * this score the next that the YOU WON
     * screen is shown.
     */
    await saveScore(name);

    /**
     * The page is reaload so the game starts again.
     */
    location.reload();
});