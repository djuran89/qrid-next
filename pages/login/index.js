import React from "react";
import Router from "next/router";
import axios from "axios";

import { Form, Input, Button } from "@/components/form/form";
import { errorHandler } from "@/utility/msgHandler";
import SubHeader from "@/components/header/subHeader";

function Login({ user, setUser, translate }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [btnDisabled, setBtnDisabled] = React.useState(false);

	if (user !== null) Router.push("/profile");
	if (user !== null) return;

	const onSubmit = async () => {
		try {
			setBtnDisabled(true);
			const userLogin = await axios.post("/profile/login", { email, password });
			setUser(userLogin);
			setBtnDisabled(false);
		} catch (err) {
			errorHandler(err);
			setBtnDisabled(false);
		}
	};

	return (
		<>
			<SubHeader title="Login" />
			<div className="container hard-center width-100">
				<Form onSubmit={onSubmit}>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						name="email"
						label={translate.email}
						required={true}
					/>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						name="password"
						label={translate.password}
						required={true}
					/>
					<Button disabled={btnDisabled}>{translate.login}</Button>
				</Form>
			</div>
		</>
	);
}

export default Login;
