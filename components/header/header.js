import React from "react";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";

import { errorHandler } from "@/utility/msgHandler";

import styles from "./header.module.scss";

function Header({ user, setUser }) {
	const [notifications, setNotifications] = React.useState([]);
	const [activeNotifictions, setActiveNotifictions] = React.useState([]);
	const [playNotification, setPlayNotification] = React.useState(false);

	React.useEffect(() => {
		axios
			.get("/profile/notification")
			.then((res) => {
				setNotifications(res);
			})
			.catch((err) => errorHandler(err));
	}, []);

	React.useEffect(() => {
		const socket = io(process.env.URL);
		socket.on(user._id, (data) => {
			setNotifications([data, ...notifications]);
			playNotification && new Audio("/mp3/Notification.mp3").play();
		});

		setActiveNotifictions([...notifications.filter((el) => el.active)]);
	}, [notifications]);

	const onLogout = async () => {
		try {
			await axios.post("/profile/logout");
			setUser(null);
		} catch (err) {
			errorHandler(err);
		}
	};

	const showDropDown = (e) => {
		const dropdown = e.target.closest(".dropdown-toggle");
		const dropDownMenu = dropdown.getElementsByClassName("dropdown-menu")[0];
		const hasClass = dropDownMenu.classList.contains("hidden");

		[...document.getElementsByClassName("dropdown-menu")].map((el) => el.classList.add("hidden"));
		hasClass ? dropDownMenu.classList.remove("hidden") : dropDownMenu.classList.add("hidden");
	};

	const openNotifiction = async (e) => {
		const isOpen = e.target.closest(".dropdown-toggle").getElementsByClassName("dropdown-menu")[0].classList.contains("hidden");
		showDropDown(e);

		if (isOpen) {
			await axios.put("/profile/notification", { activeNotifictions });
			setActiveNotifictions([]);
		}
	};

	return (
		<header className={styles.header}>
			<h1>QR ID</h1>
			<nav>
				<div className={`${styles.dropdown} dropdown-toggle`}>
					<button className={styles.dropdownToggle} onClick={openNotifiction}>
						<span className="material-symbols-outlined">
							{activeNotifictions.length === 0 ? "notifications" : "notifications_active"}
						</span>

						{activeNotifictions.length > 0 && <div className={styles.active}>{activeNotifictions.length}</div>}
					</button>

					<div className={`${styles.dropdownMenu} dropdown-menu hidden`}>
						{notifications.map((notification, key) => (
							<Notification notification={notification} key={key} />
						))}
						<a className={`${styles.dropdownItem} ${styles.lastItem}`} href="/">
							See all notification
						</a>
					</div>
				</div>

				<div className={`${styles.dropdown} dropdown-toggle`}>
					<button className={styles.dropdownToggle} onClick={showDropDown}>
						<span className="material-symbols-outlined">person</span>
					</button>
					<div className={`${styles.dropdownMenu} dropdown-menu hidden`}>
						<a className={styles.dropdownItem} href="/profile/edit">
							Edit profile
						</a>
						<button className={styles.dropdownItem} onClick={onLogout}>
							Logout
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
}

const Notification = ({ notification }) => {
	const timeFromNow = () => moment(notification.createdAt).startOf().fromNow();

	return (
		<div className={styles.dropdownItem}>
			{timeFromNow()} - {notification.user.email}
		</div>
	);
};

export default Header;
