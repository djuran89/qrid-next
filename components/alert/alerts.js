import Link from "next/link";

import styles from "./alert.module.scss";

const Alert = ({ children, className, icon, title }) => {
	return (
		<div className={className}>
			<div className={styles.alert}>
				{icon && (
					<div className={styles.icon}>
						<span className={`material-symbols-outlined`}>{icon}</span>
					</div>
				)}
				<div className={styles.alertText}>
					{title && <div className={styles.alertTitle}>{title}</div>}
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Alert;
