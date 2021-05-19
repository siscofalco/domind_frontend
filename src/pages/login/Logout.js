import AuthService from "../../services/auth-service"

const Logout = () => {
    const authService = new AuthService();
    authService.logout();

    return 'Logout';
}

export default Logout;
