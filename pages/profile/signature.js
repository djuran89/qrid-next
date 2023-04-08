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

	useEffect(() => {
		const documentWidth = document.documentElement.clientWidth;
		const containerWidth = document.getElementsByClassName("container")[0].clientWidth;

		const canvasHeight = containerWidth * 0.62962962963;
		const canvasWidth = containerWidth;

		setCanvasHeight(canvasHeight);
		setCanvasWidth(canvasWidth);
	}, []);

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

	const clearSignature = () => {
		signaturePad.clear();
	};

	const saveSignature = async () => {
		try {
			const signature = signaturePad.toDataURL("image/png");
			const res = await axios.post("/profile/signature", { signature });

			setUser(res);
			successHandler("Signature saved successfully");
			Router.back();
		} catch (err) {
			errorHandler(err);
		}
	};

	return (
		<>
			<SubHeader title={"Signature"} />
			<div className="container">
				<Row>
					<Button icon={"delete"} className={"btn-secondary"} onClick={clearSignature}>
						Clear
					</Button>
					<Button icon={"save"} onClick={saveSignature}>
						Save
					</Button>
				</Row>
			</div>
			<div className={`${styles.signaturePad} container`}>
				{canvasHeight && canvasWidth && (
					<div className={styles.signaturePad__body}>
						<div className={styles.signaturePad__text}>Write you signature here.</div>
						<canvas id="signature-pad" />
					</div>
				)}
			</div>
		</>
	);
}

export default Signature;
