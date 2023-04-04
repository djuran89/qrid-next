import { Button, Form, Input, Or } from "@/components/form/form";
import translate from "@/translate/translate";

function ProfileForm({ user, setUser, onSubmit, preview, showEmail, className }) {
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
				{!preview && <Button>{translate.send}</Button>}
			</Form>
		</div>
	);
}

export default ProfileForm;
