export function renderGame(game) {
    const main = document.querySelector("#main-content");
    main.innerHTML = `
        <section id="game-overview">
            <h2>${game.name}</h2>
            <p>${game.description || "No description available."}</p>
            <section>
                <h3>Bosses</h3>
                <div id="bosses"></div>
            </section>
            <section>
                <h3>Enemies</h3>
                <div id="enemies"></div>
            </section>
            <section>
                <h3>Items</h3>
                <div id="items"></div>
            </section>
        </section>
    `;
}
