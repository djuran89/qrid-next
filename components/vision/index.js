import React from "react";
import ProfileForm from "@/components/form/profileForm";
import axios from "axios";


function Vision({}) {
	const [signatureImage, setSignatureImage] = React.useState(null);
	const [profileImage, setProfileImage] = React.useState(null);
	const [editImage, setEditImage] = React.useState(null);
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		axios.get("/vision").then((res) => {
			setUser(res.user);
		});
	}, []);

	const incriseLevelImage = (base64) => {
		const img = new Image();
		img.src = base64;
		img.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			imageData = BlackAndWhite(imageData);
			ctx.putImageData(imageData, 0, 0);
			setEditImage(canvas.toDataURL());
		};

		return img;
	};

	function BlackAndWhite(imageData) {
		const pixels = imageData.data; //  [0, 1, 2, 3,...] => [r, g, b, a, ...]
		const len = pixels.length;
		const thresholdValue = 170;

		for (let i = 0; i < len; i += 4) {
			const isWhite = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3 > thresholdValue;
			const val = isWhite ? 255 : 0;
			pixels[i] = val;
			pixels[i + 1] = val;
			pixels[i + 2] = val;
		}

		return imageData;
	}
	if (user == null) return null;
	return (
		<div className="container">
			<ProfileForm user={user} btnTitle="Save" cancel={true} />
			<img src={signatureImage} />
			<img src={profileImage} />
			<img src={editImage} />
		</div>
	);
}

export default Vision;
