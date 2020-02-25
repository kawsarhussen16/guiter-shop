import React, { Component } from "react";
import {
	update,
	generateData,
	isFormValid
} from "../../utils/Form/formActions";
import { connect } from "react-redux";
import FormField from "../../utils/Form/formField.js";
class Login extends Component {
	state = {
		formError: false,
		formSuccess: "",
		formData: {
			email: {
				element: "input",
				value: "",
				config: {
					name: "email_input",
					type: "email",
					placeholder: "Enter Your Email"
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage: ""
			},
			password: {
				element: "input",
				value: "",
				config: {
					name: "password_input",
					type: "password",
					placeholder: "Enter Your Password"
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ""
			}
		}
	};
	updateForm = element => {
		const newFormData = update(element, this.state.formData, "login");
		this.setState({
			formError: false,
			formData: newFormData
		});
	};

	submitForm = () => {};
	render() {
		return (
			<div>
				<form onSubmit={e => this.submitForm(e)}>
					<FormField
						id={"email"}
						formData={this.state.formData.email}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={"password"}
						formData={this.state.formData.password}
						change={element => this.updateForm(element)}
					/>
					{this.state.formError ? (
						<div className="error_label">
							Please check your data
						</div>
					) : null}
					<button onClick={event => this.submitForm(event)}>
						Log in
					</button>
				</form>
			</div>
		);
	}
}

export default connect()(Login);
