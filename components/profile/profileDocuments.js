import styles from "./profile.module.scss";

const ProfileDocuments = ({ user, className, imageURL }) => {
	return (
		<div className={className}>
			<div className={styles.documentHolder}>
				<div className={styles.idHolder}>
					{imageURL ? (
						<img src={imageURL} alt="Document" />
					) : (
						user.document && <img src={`/profiles/documents/${user.document}`} alt="Document" />
					)}
				</div>
				<div className={styles.signatureHolder}>{user.signature && <img src={user.signature} alt="Signature" />}</div>
			</div>
		</div>
	);
};

export default ProfileDocuments;
