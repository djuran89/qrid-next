function LoadingCircle({ className }) {
	return (
		<div className={`${className} lds-roller`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default LoadingCircle;
