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
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
	align: {
		textAlign: "center",
	},
});

const initialValues = {
	admin_name: "",
	admin_password: "",
};

const initialErrors = {
	name_error: "",
	password_error: "",
};

export default function Login(props) {
	let navigate = useNavigate();
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);
	const [error, setError] = useState(initialErrors);

	const getToken = async (values) => {
		const { admin_name, admin_password } = values;
		const res = await axios.get(
			`http://localhost:5000/admin/login/${admin_name}/`
		);
		if (res.data.admin_name === admin_name) {
			if (res.data.admin_password === admin_password) {
				localStorage.setItem("token", res.data.token);
				navigate("/board");
			} else {
				setError({
					...error,
					password_error: "Password is incorrect",
				});
			}
		} else {
			setError({
				...error,
				name_error: "User name is incorrect",
			});
		}
	};

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getToken(values);
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
						label="User name"
						name="admin_name"
						value={values.admin_name}
						onChange={handleChange}
						autoComplete="username"
						error={error.name_error ? true : false}
						helperText={error.name_error}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="admin_password"
						label="Password"
						type="password"
						value={values.admin_password}
						onChange={handleChange}
						autoComplete="current-password"
						error={error.password_error ? true : false}
						helperText={error.password_error}
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
