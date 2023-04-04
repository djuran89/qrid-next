import { Button, Form, Input, Or } from "@/components/form/form";
import SubHeader from "@/components/header/subHeader";
import React from "react";
import Loading from "@/components/loading/loading";
import axios from "axios";
import { errorHandler, successHandler } from "@/utility/msgHandler";
import Router from "next/router";
import UserForm from "@/components/form/userForm";

import styles from "./send.module.scss";

const SendProfile = ({ user, setUser, translate }) => {
	const [loading, setLoading] = React.useState(true);
	const [errorMessage, setErrorMessage] = React.useState(null);
	const [successMessage, setSuccessMessage] = React.useState(null);
	const { id } = Router.query;

	React.useEffect(() => {
		axios
			.get("/profile/login")
			.then((res) => {
				// USER IS NOT LOGIN
				setUser(res);

				if (res !== null) {
					axios
						.post("/profile/send", { to: id, from: res._id })
						.then((res) => {
							setSuccessMessage(res);
							setLoading(false);
						})
						.catch((err) => {
							setLoading(false);
							setErrorMessage(err);
						});
				} else {
					setLoading(false);
				}
			})
			.catch((err) => {
				errorHandler(err);
				setLoading(false);
			});
	}, []);

	if (loading) return <Loading />;
	return (
		<>
			<SubHeader title={translate.sendYourInfo} />

			{errorMessage ? (
				<ShowErrorMsg error={errorMessage} />
			) : successMessage ? (
				<ShowSuccessMsg msg={successMessage} />
			) : (
				<UserDontExist translate={translate} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
			)}
		</>
	);
};

const UserDontExist = ({ translate, setSuccessMessage, setErrorMessage }) => {
	const { id } = Router.query;
	const [user, setUser] = React.useState({});

	const onSubmit = async () => {
		try {
			const res = await axios.post("/profile/send", { to: id, user });
			setSuccessMessage(res);
		} catch (err) {
			setErrorMessage(err);
		}
	};

	return (
		<div className="container">
			<Button onLink={"/login"}>{translate.login}</Button>
			<Or />
			<UserForm user={user} setUser={setUser} onSubmit={onSubmit} />
		</div>
	);
};

const ShowErrorMsg = ({ error }) => {
	const message = error.response?.data?.msg || error.response?.data?.message || error.message;

	return (
		<div className={`${styles.badge} ${styles.wrong} hard-center container`}>
			<div className={`${styles.icon}`}>
				<span className="material-symbols-outlined">dangerous</span>
			</div>
			<div>{message}</div>
		</div>
	);
};

const ShowSuccessMsg = ({ msg }) => {
	const message = msg?.msg || msg?.message || "Wrong message parsed.";

	return (
		<div className={`${styles.badge} ${styles.success} hard-center container`}>
			<div className={`${styles.icon}`}>
				<span className="material-symbols-outlined">verified</span>
			</div>
			<div>{message}</div>
		</div>
	);
};

export default SendProfile;
