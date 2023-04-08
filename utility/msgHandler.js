import Router from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = "colored";
const configtToast = {
	isLoading: false,
	position: "top-right",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme,
};
export function errorHandler(err, toastId) {
	const message = err.response?.data?.msg || err.response?.data?.message || err.message || err;
	const statusCode = err.response?.status;

	if (statusCode === 403) return Router.push("/403");

	if (toastId) {
		toast.update(toastId, {
			render: message,
			type: "error",
			...configtToast,
		});
	} else {
		toast.error(message);
	}
}

export function successHandler(msg, toastId) {
	if (toastId) {
		toast.update(toastId, {
			render: msg,
			type: "success",
			...configtToast,
		});
	} else {
		toast.success(msg);
	}
}

export function showSuccess(msg, toastId) {
	if (toastId) {
		toast.update(toastId, {
			render: msg,
			type: "success",
			isLoading: false,
			position: "top-right",
			autoClose: false,
			closeOnClick: true,
			draggable: true,
			theme,
		});
	} else {
		toast.success(msg);
	}
}
