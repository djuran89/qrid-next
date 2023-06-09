import { useState } from "react";
import Router from "next/router";
import styles from "./form.module.scss";
import translate from "@/translate/translate";

export const Input = ({ className, type, name, placeholder, label, value, onChange, required, disabled }) => {
	const [dynamicType, setDynamicType] = useState(type);

	const toggleType = () => {
		if (dynamicType === "password") {
			setDynamicType("text");
		} else {
			setDynamicType("password");
		}
	};

	const pattern = (type) => {
		switch (type) {
			case "email":
				return "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
			case "number":
				return "\\d*";
			case "phone":
				return `[\\+()]*(?:\\d[\\s\\-\\.()xX]*){10,14}`;
			case "tel":
				return `[\\+()]*(?:\\d[\\s\\-\\.()xX]*){10,14}`;
			default:
				return ".*";
		}
	};

	return (
		<div className={styles.inputGroup}>
			<label>
				{type === "password" && (
					<div className={styles.togglePassword} onClick={toggleType}>
						{dynamicType === "text" ? (
							<span className="material-symbols-outlined">visibility_off</span>
						) : (
							<span className="material-symbols-outlined">visibility</span>
						)}
					</div>
				)}
				<input
					className={styles.input}
					value={value || ""}
					onChange={onChange}
					type={dynamicType}
					name={name}
					pattern={pattern(type)}
					placeholder={placeholder}
					required={required}
					readOnly={disabled}
				/>
				<div className={`${styles.labelGroup} ${value ? styles.active : ""}`}>{label}</div>
			</label>
		</div>
	);
};

export const Button = ({ ref, title, children, onClick, onChange, onLink, className, disabled, icon }) => {
	const onClickBtn = (e) => {
		onClick && onClick(e);
		onLink && Router.push(onLink);
	};
	const showReload = disabled && children === "Login";
	return (
		<button ref={ref} className={`btn btn-primary ${className}`} onClick={onClickBtn} onChange={onChange} disabled={disabled}>
			{showReload && <span className="material-symbols-outlined spining">autorenew</span>}
			{icon && <span className="material-symbols-outlined">{icon}</span>}
			{showReload ? "" : title || children}
		</button>
	);
};

export const Form = ({ children, onSubmit }) => {
	const onSubmitForm = (e) => {
		e.preventDefault();
		onSubmit(e);
	};
	return (
		<form className={styles.formGroup} onSubmit={onSubmitForm}>
			{children}
		</form>
	);
};

export const Row = ({ children, className }) => {
	return (
		<div className={className}>
			<div className={`${styles.row}`}>{children}</div>
		</div>
	);
};

export const Avatar = ({ name }) => {
	const [firstLetter, secondLetter] = name.split(" ");

	return (
		<div className={styles.avatar}>
			<div>{firstLetter[0]}</div>
			<div>{secondLetter[0]}</div>
		</div>
	);
};

export const Or = () => {
	return (
		<div className={styles.or}>
			<div className={styles.text}>{translate.or}</div>
		</div>
	);
};
