const BASE = "https://zelda.fanapis.com/api";

export async function fetchEntitiesByGame(endpoint, gameId){
    const res = await fetch(`${BASE}/${endpoint}?limit=100`);
    if(!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const json = await res.json();

    // handle API inconsistency: some endpoints use 'appearances', items use 'games'
    return json.data.filter(entity => {
        const links = entity.appearances || entity.games;
        return links?.some(url => url.includes(gameId));
    });
}
