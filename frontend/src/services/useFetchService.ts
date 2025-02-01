import superagent from 'superagent';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function useFetchService() {

    async function getRequest<T>(path: string, queryParam?: any): Promise<T> {
        const response = await superagent
            .get(`${apiBaseUrl}${path}`)
            .query(queryParam)
        return response.body;
    }

    async function getRequestText(path: string, queryParam?: any): Promise<string> {
        const response = await superagent
            .get(`${apiBaseUrl}${path}`)
            .query(queryParam)
        return response.text;
    }



    async function postRequest<T>(path: string, body?: any): Promise<T> {
        const response = await superagent
            .post(`${apiBaseUrl}${path}`)
            .send(body)
        return response.body;
    }

    async function putRequest<T>(path: string, body?: any): Promise<T> {
        const response = await superagent
            .put(`${apiBaseUrl}${path}`)
            .send(body)
        return response.body;
    }

    async function deleteRequest<T>(path: string, body: any): Promise<T> {
        const response = await superagent
            .delete(`${apiBaseUrl}${path}`)
            .send(body)
        return response.body;
    }

    return {
        getRequest,
        getRequestText,
        postRequest,
        putRequest,
        deleteRequest,
    };
}
