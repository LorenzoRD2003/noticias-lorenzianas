import nodeReq from "../axios";

class AuthorService {
    getAll() {
        return nodeReq.get(`/author`);
    }

    get(id) {
        return nodeReq.get(`/author/${id}`);
    }

    create(data) {
        return nodeReq.post("/author", data);
    }

    updatePassword(data) {
        return nodeReq.put("/author", data);
    }

    delete(id) {
        return nodeReq.delete(`/author/${id}`);
    }

    login(data) {
        return nodeReq.post("/author/login", data);
    }
}

export default new AuthorService();
