import { useState } from "react";
import axios from "axios";
import Router from "next/router";

import Header from "@/components/header/header";
import ProfileForm from "@/components/form/profileForm";
import ProfileDocuments from "@/components/profile/profileDocuments";

import { Button, Row } from "@/components/form/form";
import { errorHandler, successHandler } from "@/utility/msgHandler";

function EditProfile({ user, setUser, translate }) {
	const [fileName, setFileName] = useState("");
	const [imageURL, setImageURL] = useState("");
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

	const onUploadFile = async (e) => {
		try {
			const btn = e.target;
			const file = document.getElementById("file").files[0];
			const reader = new FileReader();
			const allowSize = 1024 * 1024 * 5; // 5MB
			reader.readAsDataURL(file);

			if (file.size > allowSize) return errorHandler("File size is too large");

			reader.onload = async () => {
				const image = reader.result;
				btn.disabled = true;
				const res = await axios.post("/profile/upload", { image });
				setUser(res);
				setImageURL(image);
				setFileName("");
				successHandler("Document uploaded successfully");
				btn.disabled = false;
			};
		} catch (err) {
			errorHandler(err);
		}
	};

	const onClickBtn = () => document.getElementById("file").click();

	const onChangeFile = (e) => {
		const fileName = e.target.files[0].name.length > 9 ? e.target.files[0].name.slice(0, 9) + "..." : e.target.files[0].name;
		setFileName(fileName);
	};

	const onSignature = () => Router.push("/profile/signature");

	return (
		<>
			<Header user={user} setUser={setUser} />

			<div className="container">
				<Row>
					<Button icon={"draw"} className={"btn-secondary"} onClick={onSignature}>
						Signature
					</Button>
					<Button icon={"description"} className={"btn-secondary"} onClick={onClickBtn}>
						{fileName ? fileName : `Document`}
					</Button>

					{fileName && <Button onClick={onUploadFile}>Upload</Button>}
				</Row>

				<ProfileDocuments user={user} imageURL={imageURL} />
			</div>
			<ProfileForm className="container" btnTitle="Save" onSubmit={onSubmit} user={user} setUser={setUser} translate={translate} />

			<input className="hidden" type="file" name="file" id="file" accept="image/png, image/jpeg" onChange={onChangeFile} />
		</>
	);
}

export default EditProfile;
