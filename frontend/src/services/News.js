import nodeReq from "../axios.js";

class NewsService {
    getAll() {
        return nodeReq.get("/news");
    }

    get(id) {
        return nodeReq.get(`/news/${id}`);
    }

    getAuthor(id) {
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
