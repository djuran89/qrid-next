import React from "react";
import axios from "axios";
import Router from "next/router";

import { errorHandler } from "@/utility/msgHandler";
import { Button, Form, Input } from "@/components/form/form";
import SubHeader from "@/components/header/subHeader";

function ConfirmEamil({ user, translate }) {
	if (user) Router.push("/profile");
	const { email } = Router.query;
	const [code, setCode] = React.useState("");

	const onSubmit = async (e) => {
		const btnSubmit = e.target.getElementsByTagName("button")[0];
		btnSubmit.disabled = true;

		try {
			await axios.post("/profile/code/confirm", { email, code });
			Router.push("/create/setPassword");
		} catch (err) {
			errorHandler(err);
		}
		btnSubmit.disabled = false;
	};

	return (
		<>
			<SubHeader title={translate.confirmCodeTitle} />
			<div className="container">
				<p style={{ textAlign: "center" }} className="mb-16">
					{translate.confirmCode} {email}. <button className="btn-empty text-secondary">{translate.resend}</button>
				</p>

				<Form onSubmit={onSubmit}>
					<Input type="text" name="code" label={translate.enterCode} value={code} onChange={(e) => setCode(e.target.value)} />
					<Button>{translate.next}</Button>
				</Form>
			</div>
		</>
	);
}

export default ConfirmEamil;
