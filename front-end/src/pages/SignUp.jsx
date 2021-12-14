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
import axios from "axios";

const useStyles = makeStyles({
	align: {
		textAlign: "center",
	},
});

const initialValues = {
	admin_email: "",
	admin_name: "",
	admin_password: "",
};

export default function SignUp() {
	let navigate = useNavigate();
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const createAccount = async () => {
		const res = await axios.post("http://localhost:5000/admin/create", values);
		if (res.status === 201) {
			navigate("/");
		} else {
			console.log(res.status);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createAccount();
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
						label="User Name"
						name="admin_name"
						value={values.admin_name}
						onChange={handleChange}
						autoComplete="username"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Email Address"
						name="admin_email"
						value={values.admin_email}
						onChange={handleChange}
						autoComplete="email"
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
