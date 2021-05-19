import AuthService from "../../services/auth-service"

const Logout = () => {
    const authService = new AuthService();
    authService.logout().then(() => {
        window.location.href = '/login';
    });

    return '';
}

export default Logout;
