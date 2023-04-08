import React from "react";
import axios from "axios";
import Router from "next/router";

import Loading from "@/components/loading/loading";
import ProfileForm from "@/components/form/profileForm";
import SubHeader from "@/components/header/subHeader";

import { errorHandler } from "@/utility/msgHandler";

import styles from "./receive.module.scss";
import ProfileDocuments from "@/components/profile/profileDocuments";

const ReceiveProfile = ({ translate }) => {
	const [profile, setProfile] = React.useState(null);
	const [tokenExpired, setTokenExpired] = React.useState(false);
	const { token } = Router.query;
	const headers = { Authorization: `Bearer ${token}` };

	// GET PROFILE
	React.useEffect(() => {
		axios
			.get("/profile", { headers })
			.then((res) => setProfile(res))
			.catch((err) => setTokenExpired(true));
	}, []);

	// CHECK TOKEN EXPIRED
	React.useEffect(() => {
		const interval = setInterval(() => {
			axios.post("/qrcode/token", { token }).then((res) => {
				setTokenExpired(!res);
				errorHandler("Token expired");
				if (!res) clearInterval(interval);
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (tokenExpired)
		return (
			<>
				<SubHeader title={translate.profile} />
				<ShowErrorMsg error="QR code was expired." />
			</>
		);
	if (!profile) return <Loading />;
	return (
		<>
			<SubHeader title={translate.profile} />
			{!tokenExpired && <ProfileDocuments className="container" user={profile} />}
			{!tokenExpired && <ProfileForm className="container" user={profile} preview={true} showEmail={true} />}
		</>
	);
};

const ShowErrorMsg = ({ error }) => {
	const message = error.response?.data?.msg || error.response?.data?.message || error.message || error || "Something went wrong";

	return (
		<div className={`${styles.badge} ${styles.wrong} hard-center container`}>
			<div className={`${styles.icon}`}>
				<span className="material-symbols-outlined">dangerous</span>
			</div>
			<div>{message}</div>
		</div>
	);
};

export default ReceiveProfile;
