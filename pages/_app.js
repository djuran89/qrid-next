import React from "react";
import axios from "axios";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import Loading from "@/components/loading/loading";
import translate from "@/translate/translate";
import "@/styles/globals.scss";
import "@/styles/spiner.css";
// import "@/styles/video.css";

process.env.URL = process.env.NODE_ENV === "development" ? "https://192.168.0.21:8080/api" : "http://18.195.49.234/api";
process.env.APPURL = process.env.NODE_ENV === "development" ? "https://192.168.0.21:3000" : "http://18.195.49.234";
// AXIOS CONFIG
axios.defaults.baseURL = process.env.URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	(res) => res.data
	// (err) => {
	// 	const status = err.response?.status;
	// 	const error = err.response?.data || "Something wrong with server.";
	// 	throw new Error(error.replace("Error", "Greška"));
	// }
);

console.image = function (url) {
	const image = new Image();
	image.src = url;

	image.onload = function () {
		var style = [
			"font-size: 0px;",
			"padding: " + this.height * 0.5 + "px " + this.width * 0.5 + "px;",
			"background-size: " + this.width + "px " + this.height + "px;",
			"background: url(" + url + ");",
		].join(" ");
		console.log("%c ", style);
	};
};

export default function App({ Component, pageProps }) {
	const [loading, setLoading] = React.useState(true);
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		axios
			.get("/profile/login")
			.then((res) => {
				setUser(res);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	if (loading) return <Loading />;
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			</Head>

			<Component user={user} setUser={setUser} translate={translate} {...pageProps} />
			<Toastify />
		</>
	);
}

const Toastify = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover
			theme="colored"
		/>
	);
};
