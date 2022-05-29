import { axios } from "../axios";

class NewsService {
    getAll() {
        return axios.get("/news");
    }

    get(id) {
        return axios.get(`/news/${id}`);
    }

    getAuthor(id) {
        return axios.get(`/news/${id}/author`);
    }

    create(data) {
        return axios.post("/news", data);
    }

    update(data) {
        return axios.put("/news", data);
    }

    delete(id) {
        return axios.delete(`/news/${id}`);
    }
}

export default new NewsService();
