import nodeReq from "../axios.js";

class NewsService {
    getAll(limit = 12, category = "", author = "") {
        let queryString = "/news";
        queryString += `?limit=${limit}`;

        if (category)
            queryString += `&category=${category}`;
        
        if (author)
            queryString += `&category=${author}`;

        return nodeReq.get(queryString);
    }

    get(id) {
        return nodeReq.get(`/news/${id}`);
    }

    getAuthorName(id) {
        return nodeReq.get(`/news/${id}/author`);
    }

    create(data, token) {
        return nodeReq.post("/news", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    update(data, token) {
        return nodeReq.put("/news", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    delete(id, token) {
        return nodeReq.delete(`/news/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}

export default new NewsService();
