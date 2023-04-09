import SubHeader from "@/components/header/subHeader";
import { useEffect, useState } from "react";
import SignaturePad from "signature_pad";

import styles from "./styles.module.scss";
import { Button, Row } from "@/components/form/form";
import { errorHandler, successHandler } from "@/utility/msgHandler";
import axios from "axios";
import Router from "next/router";

function Document({ user, setUser, translate }) {
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (user.document) setFile(user.document);
	}, []);

	const onSelect = () => document.getElementById("file").click();

	const onUpload = async () => {
		try {
			const document = await resizeImage(file, 960);
			await axios.put("/profile/document", { document });

			setUser({ ...user, document: document });
			successHandler("Document added successfully");
			Router.push("/profile/edit");
		} catch (err) {
			errorHandler(err);
		}
	};

	const onDelete = async () => {
		try {
			const document = null;
			await axios.put("/profile/document", { document });

			setUser({ ...user, document: document });
			successHandler("Document deleted successfully");
			Router.push("/profile/edit");
		} catch (err) {
			errorHandler(err);
		}
	};

	const onChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			setFile(reader.result);
		};
	};

	const resizeImage = async (base64Str, width) => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = base64Str;
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const scaleFactor = width / img.width;
				canvas.width = width;
				canvas.height = img.height * scaleFactor;
				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
				const resizedBase64 = canvas.toDataURL("image/jpeg");
				resolve(resizedBase64);
			};
		});
	};

	return (
		<>
			<SubHeader title={"Document"} />

			<div className="container">
				<Row>
					<Button icon={"description"} className={"btn-secondary flex-1"} onClick={onSelect} title={"Select"} />
					<Button icon={"scan_delete"} className={"btn-secondary flex-1"} onClick={onDelete} title={"Delete"} />
					<Button icon={"upload_file"} className={"flex-1"} onClick={onUpload} title={"Upload"} disabled={!file} />
				</Row>

				<div className={`${styles.prviewDocument}`}>{file && <img src={file} alt="Document" />}</div>

				<input id="file" className="hidden" type="file" accept="image/*" onChange={onChange} />
			</div>
		</>
	);
}

export default Document;
