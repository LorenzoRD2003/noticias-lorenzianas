import { axios } from "../axios";

class AuthorService {
    getAll() {
        return axios.get(`/author`);
    }

    get(id) {
        return axios.get(`/author/${id}`);
    }

    create(data) {
        return axios.post("/author", data);
    }

    updatePassword(data) {
        return axios.put("/author", data);
    }

    delete(id) {
        return axios.delete(`/author/${id}`);
    }
}

export default new AuthorService();
