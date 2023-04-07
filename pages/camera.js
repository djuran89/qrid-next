import { errorHandler } from "@/utility/msgHandler";
import React from "react";

// import { FilesetResolver } from "@mediapipe/tasks-vision";
import { ObjectDetector, FilesetResolver, ImageClassifier } from "../node_modules/@mediapipe/tasks-vision/vision_bundle.js";
import axios from "axios";
// import vision from "https://cdn.skypack.dev/@mediapipe/tasks-vision@latest";
// const { ObjectDetector, FilesetResolver, Detection } = vision;

let runningMode = "IMAGE";
let imageClassifier;
let objectDetector;
let video;
function Camera() {
	const [profileImage, setProfileImage] = React.useState(null);
	const [signatureImage, setSignatureImage] = React.useState(null);

	React.useEffect(() => {
		video = document.getElementById("videoCam");
		initializeObjectDetector();
	}, []);

	// Initialize the object detector
	const initializeObjectDetector = async () => {
		const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
		// objectDetector = await ObjectDetector.createFromOptions(vision, {
		// 	baseOptions: {
		// 		modelAssetPath: `https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`,
		// 	},
		// 	scoreThreshold: 0.5,
		// 	runningMode: runningMode,
		// });

		imageClassifier = await ImageClassifier.createFromModelPath(
			vision,
			"https://storage.googleapis.com/mediapipe-tasks/image_classifier/efficientnet_lite0_uint8.tflite"
		);

		// enableCamera();
	};

	const enableCamera = async () => {
		try {
			const mediaDevices = navigator.mediaDevices;
			if (!mediaDevices || !mediaDevices.getUserMedia) {
				console.log("getUserMedia() not supported.");
				return;
			}

			// Activate the webcam stream.
			const stream = await mediaDevices.getUserMedia({ audio: false, video: true });
			video.srcObject = stream;
			// video.addEventListener("loadeddata", predictWebcam);
			video.addEventListener("loadeddata", () => setInterval(takePicture, 1000));
		} catch (err) {
			errorHandler(err);
		}
	};

	const takePicture = async () => {
		try {
			const video = document.getElementById("videoCam");
			const image = document.getElementById("detectedImage");
			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvas.getContext("2d").drawImage(video, 0, 0);
			const data = canvas.toDataURL("image/png");
			image.src = data;

			setTimeout(() => imageClassifierFn(image), 10);
		} catch (err) {
			console.log(err);
		}
	};

	const imageClassifierFn = (image) => {
		try {
			const { classifications } = imageClassifier.classify(image);
			const objects = classifications[0].categories.slice(0, 20).map((el) => el);

			objects.forEach((el) => {
				isObjectIncluded(el, "packet") && console.log("YES");
			});
		} catch (err) {
			console.log(err);
		}
	};

	const isObjectIncluded = (object, name) => {
		if (object.categoryName === name) {
			if (object.score > 0.15) return true;
		}
		return false;
	};

	const stopCamera = () => {
		let video = document.getElementById("videoCam");
		let stream = video.srcObject;
		let tracks = stream.getTracks();

		for (let i = 0; i < tracks.length; i++) {
			let track = tracks[i];
			track.stop();
		}

		video.srcObject = null;
	};

	const detectObjectsImage = async (image) => {
		try {
			const detections = await objectDetector.detect(image);
			const categories = detections.map((detection) => detection.categories);
			const objects = categories.map(([category]) => {
				return { score: category.score, name: category.categoryName };
			});
			displayImageDetections(detections, image);
			// console.log(objects);
		} catch (err) {
			console.log(err);
		}
	};

	const onSendImage = async () => {
		try {
			const image = document.getElementById("detectedImage");
			// const res = await axios.post("/vision", { image: image.src });
			// console.log(res);
			// setProfileImage(res.image);
			// setSignatureImage(res.signature);
			// console.log(image);
			const detections = await objectDetector.detect(image);
			const categories = detections.map((detection) => detection.categories);
			const objects = categories.map(([category]) => {
				return { score: category.score, name: category.categoryName };
			});
			displayImageDetections(detections, image);
			console.log(objects);
		} catch (err) {
			console.log(err);
		}
	};

	const predictWebcam = async (video) => {
		// if image mode is initialized, create a new classifier with video runningMode
		if (runningMode === "IMAGE") {
			runningMode = "VIDEO";
			// await runDemo();
			await objectDetector.setOptions({ runningMode: runningMode });
		}
		let nowInMs = Date.now();

		// Detect objects using detectForVideo
		const detections = await objectDetector.detectForVideo(video, nowInMs);
		console.log(detections);
		// displayVideoDetections(detections);

		// Call this function again to keep predicting when the browser is ready
		window.requestAnimationFrame(predictWebcam);
	};

	return (
		<>
			<div id="liveView" className="videoView">
				<button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableCamera}>
					ENABLE WEBCAM
				</button>
				<button id="webcamButton" className="mdc-button mdc-button--raised" onClick={stopCamera}>
					STOP WEBCAM
				</button>
				<button id="webcamButton" className="mdc-button mdc-button--raised" onClick={takePicture}>
					Take
				</button>
				{/* <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={onSendImage}>
					SEND
				</button> */}

				<video id="videoCam" autoPlay playsInline></video>
				<div id="detections">
					<img id="detectedImage" src="" alt="" />
				</div>
				<img src={profileImage} alt="" />
				<img src={signatureImage} alt="" />
			</div>
		</>
	);
}

export default Camera;

function displayImageDetections(detections, resultElement) {
	const ratio = resultElement.height / resultElement.naturalHeight;
	[...resultElement.parentNode.getElementsByClassName("highlighter")].forEach((box) => box.remove());
	[...resultElement.parentNode.getElementsByClassName("info")].forEach((box) => box.remove());

	for (let detection of detections) {
		// Description text
		const p = document.createElement("p");
		p.setAttribute("class", "info");
		p.innerText =
			detection.categories[0].categoryName + " - with " + Math.round(parseFloat(detection.categories[0].score) * 100) + "% confidence.";
		// Positioned at the top left of the bounding box.
		// Height is whatever the text takes up.
		// Width subtracts text padding in CSS so fits perfectly.
		p.style =
			"left: " +
			detection.boundingBox.originX * ratio +
			"px;" +
			"top: " +
			detection.boundingBox.originY * ratio +
			"px; " +
			"width: " +
			(detection.boundingBox.width * ratio - 10) +
			"px;position: absolute;";
		const highlighter = document.createElement("div");
		highlighter.setAttribute("class", "highlighter");
		highlighter.style =
			"left: " +
			detection.boundingBox.originX * ratio +
			"px;" +
			"top: " +
			detection.boundingBox.originY * ratio +
			"px;" +
			"width: " +
			detection.boundingBox.width * ratio +
			"px;" +
			"height: " +
			detection.boundingBox.height * ratio +
			"px;" +
			"position: absolute;";

		resultElement.parentNode.appendChild(highlighter);
		resultElement.parentNode.appendChild(p);
	}
}
