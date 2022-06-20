import nodeReq from "../axios";

class AuthorService {
    getAll() {
        return nodeReq.get(`/author`);
    }

    get(id) {
        return nodeReq.get(`/author/${id}`);
    }

    create(data, token) {
        return nodeReq.post("/author", data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    updatePassword(id, data, token) {
        return nodeReq.put(`/author/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    delete(id, token) {
        return nodeReq.delete(`/author/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}

export default new AuthorService();
