const BASE = "https://zelda.fanapis.com/api";

export async function fetchGameByName(name) {
    const res = await fetch(`${BASE}/games?name=${encodeURIComponent(name)}`);
    if(!res.ok) throw new Error("Failed to fetch game");
    const json = await res.json();
    return json.data[0]; // first match
}
