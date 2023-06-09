import { Button, Form, Input, Or, Row } from "@/components/form/form";
import translate from "@/translate/translate";
import Router from "next/router";

import styles from "./form.module.scss";

function ProfileForm({ user, setUser, onSubmit, preview, showEmail, className, btnTitle = "Send", cancel = false }) {
	return (
		<div className={className}>
			<Form onSubmit={onSubmit}>
				{showEmail && (
					<Input
						type="text"
						name="email"
						label={translate.email}
						value={user.email || ""}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						required={true}
						disabled={preview}
					/>
				)}
				<Input
					type="text"
					name="firstname"
					label={translate.firstname}
					value={user.firstname || ""}
					onChange={(e) => setUser({ ...user, firstname: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					type="text"
					name="lastname"
					label={translate.lastname}
					value={user.lastname || ""}
					onChange={(e) => setUser({ ...user, lastname: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					name="idnumber"
					type="number"
					label={translate.idnumber}
					value={user.idnumber || ""}
					onChange={(e) => setUser({ ...user, idnumber: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					type="text"
					name="address"
					label={translate.address}
					value={user.address || ""}
					onChange={(e) => setUser({ ...user, address: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					type="text"
					name="city"
					label={translate.city}
					value={user.city || ""}
					onChange={(e) => setUser({ ...user, city: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					type="text"
					name="zipcode"
					label={translate.zipcode}
					value={user.zipcode || ""}
					onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					type="text"
					name="country"
					label={translate.country}
					value={user.country || ""}
					onChange={(e) => setUser({ ...user, country: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					name="phone"
					type="tel"
					label={translate.phone}
					value={user.phone || ""}
					onChange={(e) => setUser({ ...user, phone: e.target.value })}
					required={true}
					disabled={preview}
				/>
				<Input
					name="Date of Birth"
					type="date"
					label={"Date of Birth"}
					value={user.dateOfBirth || ""}
					onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
					required={true}
					disabled={preview}
				/>
				{/* <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31"></input> */}
				{!preview && (
					<Row>
						{cancel && (
							<Button className="btn-full btn-secondary" onClick={() => Router.back()}>
								Cancel
							</Button>
						)}
						<Button className="btn-full">{btnTitle}</Button>
					</Row>
				)}
			</Form>
		</div>
	);
}

export default ProfileForm;
