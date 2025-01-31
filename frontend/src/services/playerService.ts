const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function createPlayer(name: string) {
    const encodedName = encodeURIComponent(name);
    const response = fetch(`${apiBaseUrl}/player?${encodedName}` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response;
}