import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/index";
import Layout from "./hoc/layout";
import LoginRegister from "./components/Login-register";
const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route
					path="/register_login"
					exact
					component={LoginRegister}
				/>
			</Switch>
		</Layout>
	);
};

export default Routes;
