import translate from "@/translate/translate";

function Loading() {
	return (
		<div className="hard-center spiner">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
			<div>{translate.loading}</div>
		</div>
	);
}

export default Loading;
