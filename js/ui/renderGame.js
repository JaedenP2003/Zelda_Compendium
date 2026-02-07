export function renderGame(game) {
    const main = document.querySelector("#main-content");
    main.innerHTML = `
        <section id="game-overview">
            <h2>${game.name}</h2>
            <p>${game.description || "No description available."}</p>
            <div id="bosses"><h3>Bosses</h3></div>
            <div id="enemies"><h3>Enemies</h3></div>
            <div id="items"><h3>Items</h3></div>
        </section>
    `;
}
