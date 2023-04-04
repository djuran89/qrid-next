import axios from "axios";
import Router from "next/router";
import Header from "@/components/header/header";
import { errorHandler, successHandler } from "@/utility/msgHandler";
import { Input, Button, Form } from "@/components/form/form";
import ProfileForm from "@/components/form/profileForm";

function EditProfile({ user, setUser, translate }) {
	if (!user) Router.push("/");
	if (!user) return;

	const onSubmit = async () => {
		try {
			await axios.put("/profile", user);
			Router.push("/profile");
			successHandler("Profile updated successfully");
		} catch (err) {
			errorHandler(err);
		}
	};

	return (
		<>
			<Header user={user} setUser={setUser} />

			<ProfileForm className="container" onSubmit={onSubmit} user={user} setUser={setUser} translate={translate} />
		</>
	);
}

export default EditProfile;
