import { Button, Form, Input, Or } from "@/components/form/form";
import translate from "@/translate/translate";

function UserForm({ user, setUser, onSubmit }) {
	return (
		<Form onSubmit={onSubmit}>
			<Input
				type="text"
				name="firstname"
				label={translate.firstname}
				value={user.firstname || ""}
				onChange={(e) => setUser({ ...user, firstname: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="lastname"
				label={translate.lastname}
				value={user.lastname || ""}
				onChange={(e) => setUser({ ...user, lastname: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="idnumber"
				label={translate.idnumber}
				value={user.idnumber || ""}
				onChange={(e) => setUser({ ...user, idnumber: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="email"
				label={translate.email}
				value={user.email || ""}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="phone"
				label={translate.phone}
				value={user.phone || ""}
				onChange={(e) => setUser({ ...user, phone: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="address"
				label={translate.address}
				value={user.address || ""}
				onChange={(e) => setUser({ ...user, address: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="city"
				label={translate.city}
				value={user.city || ""}
				onChange={(e) => setUser({ ...user, city: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="state"
				label={translate.state}
				value={user.state || ""}
				onChange={(e) => setUser({ ...user, state: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="zip"
				label={translate.zip}
				value={user.zip || ""}
				onChange={(e) => setUser({ ...user, zip: e.target.value })}
				required={true}
			/>
			<Input
				type="text"
				name="country"
				label={translate.country}
				value={user.country || ""}
				onChange={(e) => setUser({ ...user, country: e.target.value })}
				required={true}
			/>
			<Button>{translate.send}</Button>
		</Form>
	);
}

export default UserForm;
