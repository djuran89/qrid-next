import React from "react";
import axios from "axios";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import Loading from "@/components/loading/loading";
import translate from "@/translate/translate";
import "@/styles/globals.scss";
import "@/styles/spiner.css";

process.env.URL = process.env.NODE_ENV === "development" ? "http://192.168.0.13:4000/api" : "http://18.195.49.234/api";
process.env.APPURL = process.env.NODE_ENV === "development" ? "http://192.168.0.13:3000" : "http://18.195.49.234";
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
	return <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="colored" />;
};
