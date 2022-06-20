import nodeReq from "../axios";

class AuthService {
    login(data) {
        return nodeReq.post("/auth/login", data);
    }
}

export default new AuthService();
