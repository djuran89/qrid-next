import Link from "next/link";
import Router from "next/router";

import styles from "./../styles/Home.module.scss";

export default function Home({ user, translate }) {
	if (user) Router.push("/profile");
	if (user) return;

	return (
		<div className="container">
			<div className={styles.landingPage}>
				<h1 className={styles.title}>QR ID</h1>
				<h2 className={styles.subtitle}>{translate.homePageMessage}.</h2>
				<Link href={"/create"} className="btn btn-full btn-primary">
					{translate.getProfile}
				</Link>
				<p>
					{translate.haveProfile}{" "}
					<Link href={"/login"} className="text-secondary">
						{translate.login}
					</Link>
				</p>
			</div>
		</div>
	);
}
