import { router } from "../main.js"; // import router for SPA navigation

export function createCard(item, type) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description ?? ""}</p>
    `;

    card.addEventListener("click", () => {
        // Update URL without reload
        history.pushState({}, "", `?type=${type}&id=${item.id}`);
        router(); // call router to render detail
    });

    return card;
}

export function renderList(data, containerSelector, type){
    const container = document.querySelector(containerSelector);
    container.innerHTML = ""; // clear old content

    if(!data.length){
        container.innerHTML = "<p>No data found.</p>";
        return;
    }

    data.forEach(item => {
        container.appendChild(createCard(item, type));
    });
}
