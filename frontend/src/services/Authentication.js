import nodeReq from "../axios";

class AuthService {
    session() {
        return nodeReq.get("/session");
    }

    login(data) {
        return nodeReq.post("/session/login", data);
    }

    logout() {
        return nodeReq.get("/session/logout");
    }
}

export default new AuthService();
