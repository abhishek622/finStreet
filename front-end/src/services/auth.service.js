import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000";

const AuthService = {
	login: async (admin_email, admin_password) => {
		const response = await axios.post(`${API_URL}/admin/login`, {
			admin_email,
			admin_password,
		});
		const token = response.data.token;
		Cookies.set("token", token);
		return response.data;
	},

	register: async (admin_name, admin_email, admin_password) => {
		const response = await axios.post(`${API_URL}/admin/register`, {
			admin_name,
			admin_email,
			admin_password,
		});
		return response.data;
	},

	logout: () => {
		Cookies.remove("token");
	},
};

export default AuthService;

// const AuthService = () => {
// 	const login = async (admin_email, admin_password) => {
// 		const response = await axios.post(`${API_URL}/admin/login`, {
// 			admin_email,
// 			admin_password,
// 		});
// 		const { token } = response.data;
// 		Cookies.set("token", token);
// 	};

// 	const logout = () => {
// 		Cookies.remove("token");
// 	};

// 	const register = async (admin_name, admin_email, admin_password) => {
// 		const response = await axios.post(`${API_URL}/admin/register`, {
// 			admin_name,
// 			admin_email,
// 			admin_password,
// 		});
// 		const { token } = response.data;
// 		Cookies.set("token", token);
// 	};

// 	return {
// 		login,
// 		logout,
// 		register,
// 	};
// };

// export default AuthService;
