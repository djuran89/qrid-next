import axios from "axios";
import Router from "next/router";
import Header from "@/components/header/header";
import { errorHandler, successHandler } from "@/utility/msgHandler";
import { Input, Button, Form } from "@/components/form/form";

import styles from "./styles.module.scss";

function EditProfile({ user, setUser, translate }) {
	if (!user) Router.push("/");
	if (!user) return;

	const onSubmit = async () => {
		try {
			await axios.put("/profile", user);
			Router.push("/profile");
			successHandler("Profile updated successfully");
		} catch (err) {
			errorHandler(err);
		}
	};

	return (
		<>
			<Header user={user} setUser={setUser} />

			<div className="container">
				<Form onSubmit={onSubmit}>
					<Input
						name="firstname"
						label={translate.firstname}
						value={user.firstname}
						onChange={(e) => setUser({ ...user, firstname: e.target.value })}
						required={true}
					/>
					<Input
						name="lastname"
						label={translate.lastname}
						value={user.lastname}
						onChange={(e) => setUser({ ...user, lastname: e.target.value })}
						required={true}
					/>
					<Input
						name="idnumber"
						type="number"
						label={translate.idnumber}
						value={user.idnumber}
						onChange={(e) => setUser({ ...user, idnumber: e.target.value })}
						required={true}
					/>
					<Input
						name="address"
						label={translate.address}
						value={user.address}
						onChange={(e) => setUser({ ...user, address: e.target.value })}
						required={true}
					/>
					<Input
						name="city"
						label={translate.city}
						value={user.city}
						onChange={(e) => setUser({ ...user, city: e.target.value })}
						required={true}
					/>
					<Input
						name="zipcode"
						label={translate.zipcode}
						value={user.zipcode}
						onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
						required={true}
					/>
					<Input
						name="country"
						label={translate.country}
						value={user.country}
						onChange={(e) => setUser({ ...user, country: e.target.value })}
						required={true}
					/>
					<Input
						name="phone"
						type="tel"
						label={translate.phone}
						value={user.phone}
						onChange={(e) => setUser({ ...user, phone: e.target.value })}
						required={true}
					/>
					<Button>{translate.save}</Button>
				</Form>
			</div>
		</>
	);
}

export default EditProfile;
