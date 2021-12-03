import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Login, SignUp } from "./pages";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		secondary: {
			main: orange[500],
		},
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				{/* <Route path="*" element={<NoMatch />} /> */}
				<Route path="/board" element={<Dashboard />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
