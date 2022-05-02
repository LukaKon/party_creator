import axios from "axios";
import {LOCALHOST} from "./settings";
import { Buffer } from 'buffer';


export const axiosInstance = axios.create({
    baseURL: LOCALHOST,
    timeout: 5000,
    headers: {
        Authorization: sessionStorage.getItem('access_token')
            ? "JWT" + sessionStorage.getItem('access_token')
            : null,
        "Content-Type": 'application/json',
        accept: 'application/json',
    }
})

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	 function (error) {
		const originalRequest = error.config;
		const decodedToken = (token) =>{
			let decoding = Buffer.from(token, 'base64').toString('ascii').split("}")
			decoding = decoding[1] + "}"
			return JSON.parse(decoding)
		}

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === LOCALHOST + 'token/refresh/'
		) {
			window.location.href = '/signin/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = sessionStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = decodedToken(refreshToken)
				console.log('refresh decoding test',decodedToken(refreshToken))

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				// console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/account/login/refresh/', { refresh: refreshToken })
						.then((response) => {
							sessionStorage.setItem('access_token', response.data.access);
							sessionStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/signin/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/signin/';
			}
		}

		// specific error handling done elsewhere
		// return Promise.reject(error);
	}
);