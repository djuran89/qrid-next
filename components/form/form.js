import { useState } from "react";
import Router from "next/router";
import styles from "./form.module.scss";
import translate from "@/translate/translate";

export const Input = ({ className, type, name, placeholder, label, value, onChange, required }) => {
	const [dynamicType, setDynamicType] = useState(type);

	const toggleType = () => {
		if (dynamicType === "password") {
			setDynamicType("text");
		} else {
			setDynamicType("password");
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
					value={value}
					onChange={onChange}
					type={dynamicType}
					name={name}
					placeholder={placeholder}
					required={required}
				/>
				<div className={`${styles.labelGroup} ${value ? styles.active : ""}`}>{label}</div>
			</label>
		</div>
	);
};

export const Button = ({ ref, title, children, onClick, onChange, onLink, className = "btn btn-primary btn-full", disabled }) => {
	const onClickBtn = () => {
		onClick && onClick();
		onLink && Router.push(onLink);
	};

	return (
		<button ref={ref} className={className} onClick={onClickBtn} onChange={onChange} disabled={disabled}>
			{title || children}
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

export const Or = () => {
	return (
		<div className={styles.or}>
			<div className={styles.text}>{translate.or}</div>
		</div>
	);
};
