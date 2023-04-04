import React from "react";
import axios from "axios";
import Router from "next/router";
import QRCode from "react-qr-code";
import Header from "@/components/header/header";

import translate from "@/translate/translate";

import styles from "./styles.module.scss";
import { errorHandler } from "@/utility/msgHandler";
import Link from "next/link";

function Profile({ user, setUser }) {
	const [showReseveQRCode, setShowReseveQRCode] = React.useState(true);
	const [isProfileValid, setIsProfileValid] = React.useState(null);

	React.useEffect(() => {
		checkProfileValid();
	}, []);

	const checkProfileValid = () => {
		if (!user) return false;
		if (
			!user.firstname ||
			!user.lastname ||
			!user.address ||
			!user.city ||
			!user.country ||
			!user.idnumber ||
			!user.zipcode ||
			!user.email ||
			!user.phone
		)
			return setIsProfileValid(false);
		setIsProfileValid(true);
	};

	if (!user) Router.push("/");
	if (!user) return;
	if (isProfileValid === null) return null;
	return (
		<>
			<Header user={user} setUser={setUser} />
			{isProfileValid ? (
				<div className={`${styles.qrHolder}`}>
					{showReseveQRCode ? <ReseveQR user={user} /> : <SendQR user={user} />}

					<div className={`${styles.buttons}`}>
						<div className={styles.buttonHolder}>
							<button className={`btn btn-primary btn-full btn-big`} onClick={() => setShowReseveQRCode(true)}>
								Receive information
							</button>
							<button className={`btn btn-secondary btn-full btn-big`} onClick={() => setShowReseveQRCode(false)}>
								Send information
							</button>
						</div>
					</div>
				</div>
			) : (
				<ShowProfileInvalid />
			)}
		</>
	);
}

const ShowProfileInvalid = () => {
	return (
		<div className="container">
			<div className={styles.alert}>
				<div className={styles.icon}>
					<span className={`material-symbols-outlined`}>warning</span>
				</div>
				<div className={styles.alertText}>
					<div className={styles.alertTitle}>Not active profile</div>
					<div>
						Your profile is not active yet.
						<br />
						Plase go edit profile and fill all information to be able to use our aplication.
						<Link className="text-primary" href="/profile/edit">
							Edit profile
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
const ReseveQR = ({ user }) => {
	return (
		<div className={`${styles.qrcode}`}>
			<QRCode value={`${process.env.APPURL}/send/${user._id}`} />

			<div className={styles.validCode}>
				<div className={styles.validInfo}>
					<span className={`material-symbols-outlined ${styles.icon}`}>all_inclusive</span> QR valide for all time
				</div>
			</div>

			<div className={`${styles.info}`}>Who scan this QR code you will receive his information.</div>
		</div>
	);
};

const SendQR = ({ user }) => {
	const validTokenTime = 180;
	const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primaryColor");
	const redColor = getComputedStyle(document.documentElement).getPropertyValue("--redColor");
	const [qrCodeColor, setQrCodeColor] = React.useState(primaryColor);
	const [timeCountdown, setTimeCountdown] = React.useState(validTokenTime);
	const [token, setToken] = React.useState(null);

	React.useEffect(() => {
		let timer = null;
		getToken().then(() => (timer = intervalFn(validTokenTime)));
		return () => clearInterval(timer);
	}, []);

	function intervalFn(time) {
		setQrCodeColor(primaryColor);
		const timer = setInterval(() => {
			time--;
			time === 0 && clearInterval(timer);
			time === 0 && setQrCodeColor(redColor);
			setTimeCountdown(time);
		}, 1000);

		return timer;
	}

	const getToken = async () => {
		try {
			const res = await axios.get(`/qrcode/token`);
			setToken(res);
		} catch (err) {
			errorHandler(err);
		}
	};

	const onRefreshToken = () => {
		getToken().then(() => {
			setTimeCountdown(validTokenTime);
			intervalFn(validTokenTime);
		});
	};

	return (
		<div className={`${styles.qrcode}`}>
			<QRCode fgColor={qrCodeColor} value={`${process.env.APPURL}/receive/${token}`} />

			<div className={styles.validCode}>
				<div className={styles.validInfo}>
					{timeCountdown > 0 ? (
						<span className={`material-symbols-outlined ${styles.icon}`}>timer</span>
					) : (
						<span onClick={onRefreshToken} className={`material-symbols-outlined ${styles.icon}`}>
							replay
						</span>
					)}
					{timeCountdown > 0 ? `QR valid for ${timeCountdown} secounds` : `QR expired, click to refresh`}
				</div>
			</div>

			<div className={`${styles.info}`}>{`Any one who scan this QR code will see your information. ${(
				<br />
			)}After code expire no one can't see your infomation.`}</div>
		</div>
	);
};

export default Profile;
