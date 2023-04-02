import React from "react";
import SubHeader from "@/components/header/subHeader";
import PropTypes from "prop-types";

export default (WrappedComponent) => {
	const hocComponent = ({ ...props }) => (
		<>
			<SubHeader title={props.title} />
			<WrappedComponent {...props} />
		</>
	);
	// hocComponent.propTypes = {};

	return hocComponent;
};
