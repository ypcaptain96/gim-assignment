export interface LoginResponse {
	data: {
		token: string;
		message: string;
	}
	success: boolean;
	message: string;
}

export interface LoginData {
	email: string;
	password: string;
}
