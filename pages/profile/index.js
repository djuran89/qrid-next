import React from "react";
import Router from "next/router";
import QRCode from "react-qr-code";
import Header from "@/components/header/header";

import styles from "./styles.module.scss";

function Profile({ translate, user, setUser }) {
	if (!user) Router.push("/");
	if (!user) return;

	return (
		<>
			<Header user={user} setUser={setUser} />
			<div className="container">
				<div className={`${styles.qrcode}`}>
					<QRCode value={`${process.env.APPURL}/send/${user._id}`} />
					<div className={`${styles.info}`}>{translate.fistQRInfo}</div>
				</div>
				{/* 
				<div className={`${styles.buttons}`}>
					<button className={`btn btn-primary btn-full btn-big`}>Reseve code</button>
					<button className={`btn btn-secondary btn-full btn-big`}>Send code</button>
				</div> */}
			</div>
		</>
	);
}

export default Profile;
