import SubHeader from "@/components/header/subHeader";
import { useEffect, useState } from "react";
import SignaturePad from "signature_pad";

import styles from "./styles.module.scss";
import { Button, Row } from "@/components/form/form";
import { errorHandler, successHandler } from "@/utility/msgHandler";
import axios from "axios";
import Router from "next/router";

function Signature({ user, setUser, translate }) {
	const [signaturePad, setSignaturePad] = useState(null);
	const [canvasHeight, setCanvasHeight] = useState(null);
	const [canvasWidth, setCanvasWidth] = useState(null);
	const [displaySignature, setDisplaySignature] = useState(null);

	// Initial canvas size
	useEffect(() => {
		const containerWidth = document.getElementsByClassName(styles.signaturePad)[0].clientWidth;

		const canvasHeight = containerWidth * 0.62962962963;
		const canvasWidth = containerWidth;

		setCanvasHeight(canvasHeight);
		setCanvasWidth(canvasWidth);
		setDisplaySignature(user.signature);
	}, []);

	// Initialize signature pad
	useEffect(() => {
		if ((canvasHeight, canvasWidth)) {
			const canvas = document.getElementById("signature-pad");
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;

			const signaturePad = new SignaturePad(canvas, {
				penColor: "rgb(0, 0, 0)",
			});

			setSignaturePad(signaturePad);

			// Rebinds all event handlers
			signaturePad.on();

			// Unbinds all event handlers
			return () => signaturePad.off();
		}
	}, [canvasHeight, canvasWidth]);

	const onClearSignature = () => {
		signaturePad.clear();
		setDisplaySignature(null);
	};

	const onSaveSignature = async () => {
		try {
			const signaturePadBase64 = signaturePad.toDataURL("image/png");
			const signature = displaySignature === null ? signaturePadBase64 : await concatBase64Images(displaySignature, signaturePadBase64);
			await axios.put("/profile/signature", { signature });

			setUser({ ...user, signature });
			successHandler("Signature saved successfully");
			Router.push("/profile/edit");
		} catch (err) {
			errorHandler(err);
		}
	};

	const onDeleteSignature = async () => {
		try {
			const signature = null;
			await axios.put("/profile/signature", { signature });

			setUser({ ...user, signature });
			successHandler("Signature deleted successfully");
			Router.push("/profile/edit");
		} catch (err) {
			errorHandler(err);
		}
	};

	const concatBase64Images = (base64Image1, base64Image2) => {
		return new Promise((resolve) => {
			const img1 = new Image();
			img1.src = base64Image1;
			img1.onload = () => {
				const img2 = new Image();
				img2.src = base64Image2;
				img2.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img1.width;
					canvas.height = img1.height;
					const ctx = canvas.getContext("2d");
					ctx.drawImage(img1, 0, 0);
					ctx.drawImage(img2, 0, 0);
					const concatenatedBase64 = canvas.toDataURL("image/png");
					resolve(concatenatedBase64);
				};
			};
		});
	};

	return (
		<>
			<SubHeader title={"Signature"} />

			<Row className="container-x pt">
				<Button icon={"delete"} className={"btn-secondary flex-1"} onClick={onDeleteSignature} title={"Delete"} />
				<Button icon={"layers_clear"} className={"btn-secondary flex-1"} onClick={onClearSignature} title={"Clear"} />
				<Button icon={"save"} className={"flex-1"} onClick={onSaveSignature} title={"Save"} />
			</Row>

			<div className={`${styles.signaturePad}`}>
				{canvasHeight && canvasWidth && (
					<div className={styles.signaturePad__body} style={{ height: canvasHeight, width: canvasWidth }}>
						<div className={styles.signaturePad__text}>Write you signature here.</div>
						<canvas id="signature-pad" />
					</div>
				)}
				<div className={styles.signaturePad__display}>{displaySignature && <img src={displaySignature} />}</div>
			</div>
		</>
	);
}

export default Signature;
