import { Button, Form, Input, Or } from "@/components/form/form";
import translate from "@/translate/translate";

function ProfileForm({ user, setUser, onSubmit, preview, showEmail, className, btnTitle = "Send" }) {
	return (
		<div className={className}>
			<Form onSubmit={onSubmit}>
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
				{!preview && <Button>{btnTitle}</Button>}
			</Form>
		</div>
	);
}

export default ProfileForm;
