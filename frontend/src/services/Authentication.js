import nodeReq from "../axios";

class AuthService {
    login(data) {
        return nodeReq.post("/auth/login", data);
    }

    refresh(token) {
        return nodeReq.put("/auth/refresh", token);
    }
}

export default new AuthService();
