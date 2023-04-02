import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import { errorHandler } from "@/utility/msgHandler";

import SubHeader from "@/components/header/subHeader";
import { Form, Input, Button } from "@/components/form/form";

function ProfileCreate({ user, translate }) {
	if (user) Router.push("/profile");
	const [email, setEmail] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
		setIsEmailValid(e.target.value.includes("@") && e.target.value.includes("."));
	};

	const onSubmit = () => {
		axios
			.post("/profile/code/send", { email })
			.then(() => Router.push(`/create/confirmEmail?email=${email}`))
			.catch((err) => errorHandler(err));
	};

	return (
		<>
			<SubHeader title={translate.createProfile} />
			<div className="container">
				<Form onSubmit={onSubmit}>
					<Input type="text" name="email" value={email} onChange={onChangeEmail} label={translate.enterEmail} />
					<Button disabled={!isEmailValid} className="btn btn-primary btn-full">
						{translate.next}
					</Button>
				</Form>
			</div>
		</>
	);
}

export default ProfileCreate;
