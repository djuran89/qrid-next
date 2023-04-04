import React from "react";
import axios from "axios";
import Router from "next/router";

import Loading from "@/components/loading/loading";
import ProfileForm from "@/components/form/profileForm";
import SubHeader from "@/components/header/subHeader";

import { errorHandler } from "@/utility/msgHandler";

const ReceiveProfile = ({ translate }) => {
	const { token } = Router.query;
	const [profile, setProfile] = React.useState(null);
	const headers = { Authorization: `Bearer ${token}` };

	React.useEffect(() => {
		axios
			.get("/profile", { headers })
			.then((res) => setProfile(res))
			.catch((err) => errorHandler(err));
	}, []);

	if (!profile) return <Loading />;
	return (
		<>
			<SubHeader title={translate.profile} />
			<ProfileForm className="container" user={profile} preview={true} showEmail={true} />
		</>
	);
};

export default ReceiveProfile;
