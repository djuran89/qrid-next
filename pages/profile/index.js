import React from "react";
import Router from "next/router";
import QRCode from "react-qr-code";
import Header from "@/components/header/header";

function Profile({ user, setUser }) {
	if (!user) Router.push("/");
	if (!user) return;

	return (
		<>
			<Header user={user} setUser={setUser} />
			<div className="hard-center">
				<QRCode value={`${process.env.APPURL}/send/${user._id}`} />
			</div>
		</>
	);
}

export default Profile;
