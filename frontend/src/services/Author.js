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

    updatePassword(id, data) {
        return nodeReq.put(`/author/${id}`, data);
    }

    delete(id) {
        return nodeReq.delete(`/author/${id}`);
    }
}

export default new AuthorService();
