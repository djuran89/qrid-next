import Router from "next/router";
import { useEffect, useState } from "react";

import styles from "./header.module.scss";

function SubHeader({ title }) {
	const [showBack, setShowBack] = useState(false);

	useEffect(() => {
		if (window.history.length > 2) setShowBack(true);
	}, []);

	const goBack = () => (showBack ? Router.back() : Router.push("/"));

	return (
		<header className={styles.subHeader}>
			<div className={styles.content}>
				<h1>{title}</h1>
				<button className="btn btn-empty" onClick={goBack}>
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</button>
			</div>
		</header>
	);
}

export default SubHeader;
