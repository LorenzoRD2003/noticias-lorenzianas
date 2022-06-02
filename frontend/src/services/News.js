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

    create(data) {
        return nodeReq.post("/news", data);
    }

    update(data) {
        return nodeReq.put("/news", data);
    }

    delete(id) {
        return nodeReq.delete(`/news/${id}`);
    }
}

export default new NewsService();
