import React from "react";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

import { successHandler, errorHandler } from "@/utility/msgHandler";
import SubHeader from "@/components/header/subHeader";
import { Button, Form, Input } from "@/components/form/form";

function CreateProfile({ user, setUser, translate }) {
	if (user) Router.push("/profile");
	if (user) return;

	const [password, setPassword] = React.useState("");

	const onSubmit = (e) => {
		const btnSubmit = e.target.getElementsByTagName("button")[0];
		const toastId = toast.loading(translate.loading);

		btnSubmit.disabled = true;

		axios
			.post("/profile/create", { password })
			.then((res) => {
				successHandler("Your account is created.", toastId);
				btnSubmit.disabled = false;
				setUser(res);
			})
			.catch((err) => errorHandler(err, toastId));
	};

	return (
		<>
			<SubHeader title={translate.createProfile} />
			<div className="container">
				<Form onSubmit={onSubmit}>
					<Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" label={translate.eneterPassword} required={true} />
					<Button>{translate.createYourProfile}</Button>
				</Form>
			</div>
		</>
	);
}

export default CreateProfile;
