import { fetchGameByName } from "./api/fetchGame.js";
import { fetchEntitiesByGame } from "./api/fetchEntitiesByGame.js";
import { renderGame } from "./ui/renderGame.js";
import { renderList } from "./ui/renderList.js";

// SPA router
export async function router(){
    const main = document.querySelector("#main-content");
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "game";
    const id = params.get("id");

    main.innerHTML = "<p>Loading...</p>";

    try{
        if(type === "game"){
            const game = await fetchGameByName("Twilight Princess");
            renderGame(game);

            const [bosses, enemies, items] = await Promise.all([
                fetchEntitiesByGame("bosses", game.id),
                fetchEntitiesByGame("monsters", game.id),
                fetchEntitiesByGame("items", game.id)
            ]);

            renderList(bosses, "#bosses", "boss");
            renderList(enemies, "#enemies", "monster");
            renderList(items, "#items", "item");

        } else if(type === "boss" || type === "monster" || type === "item"){
            const res = await fetch(`https://zelda.fanapis.com/api/${type}s/${id}`);
            if(!res.ok) throw new Error("Failed to fetch entity");
            const json = await res.json();
            const entity = json.data;

            main.innerHTML = `
                <button id="back-btn">← Back</button>
                <h2>${entity.name}</h2>
                <p>${entity.description || "No description available."}</p>
            `;

            document.querySelector("#back-btn").addEventListener("click", () => {
                history.pushState({}, "", "?type=game");
                router();
            });

        } else {
            main.innerHTML = "<p>Unknown route</p>";
        }
    } catch(error){
        console.error(error);
        main.innerHTML = "<p>Failed to load data.</p>";
    }
}
function getEndpoint(type) {
    switch(type){
        case "boss": return "bosses";
        case "monster": return "monsters";
        case "item": return "items";
        case "game": return "games";
        default: return null;
    }
}



// Handle browser navigation
window.addEventListener("popstate", router);

// Initial load
router();
