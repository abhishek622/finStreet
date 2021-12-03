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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";

import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
	align: {
		textAlign: "center",
	},
});

const initialValues = {
	username: "",
	password: "",
};

export default function Login(props) {
	let navigate = useNavigate();
	let location = useLocation();
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate("/board");
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
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="User name"
						name="username"
						value={values.username}
						onChange={handleChange}
						autoComplete="username"
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
							to="/signup"
							variant="body2"
							underline="hover"
						>
							{"Don't have an account? Sign Up"}
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
