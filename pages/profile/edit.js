import axios from "axios";
import Router from "next/router";

import Header from "@/components/header/header";
import ProfileForm from "@/components/form/profileForm";

import { Button, Row } from "@/components/form/form";
import { errorHandler, successHandler } from "@/utility/msgHandler";

function EditProfile({ user, setUser, translate }) {
	if (!user) Router.push("/");
	if (!user) return;

	const onSubmit = async () => {
		try {
			await axios.put("/profile", { user });
			Router.push("/profile");
			successHandler("Profile updated successfully");
		} catch (err) {
			errorHandler(err);
		}
	};

	return (
		<>
			<Header user={user} setUser={setUser} />

			<Row className={"container-empty pt px"}>
				<Button icon={"draw"} className={"btn-secondary flex-1"} onLink={"/profile/signature"} title={"Signature"} />
				<Button icon={"description"} className={"btn-secondary flex-1"} onLink={"/profile/document"} title={"Document"} />
			</Row>
			<ProfileForm className="container" btnTitle="Save" onSubmit={onSubmit} user={user} setUser={setUser} translate={translate} />
		</>
	);
}

export default EditProfile;
