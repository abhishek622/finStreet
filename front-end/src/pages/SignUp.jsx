import React, { useState } from "react";
import {
	Avatar,
	Button,
	TextField,
	Link,
	Box,
	Typography,
	Container,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
	align: {
		textAlign: "center",
	},
});

const initialValues = {
	email: "",
	username: "",
	password: "",
};

export default function SignUp() {
	let navigate = useNavigate();
	let location = useLocation();
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate("/");
		console.log(values);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "#eba134" }}>
					<AccountCircleRoundedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="User Name"
						name="username"
						value={values.username}
						onChange={handleChange}
						autoComplete="username"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={values.email}
						onChange={handleChange}
						autoComplete="email"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={values.password}
						onChange={handleChange}
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Box className={classes.align}>
						<Link
							component={RouterLink}
							to="/"
							variant="body2"
							underline="hover"
						>
							{"Do you have an account? Login"}
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
