import React, { useState, useEffect } from "react";
import {
	Avatar,
	Button,
	Paper,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { d_rows } from "../Data/dummy_rows";
import CreateModal from "../components/CreateModal";
import axios from "axios";
import EditModal from "../components/EditModal";
import UseTable from "../components/UseTable";
import {
	ActionButton,
	ConfirmDialog,
	Notification,
} from "../components/controls";

export default function Dashboard() {
	const [rows, setRows] = useState(d_rows);
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);

	const { TblHead, TblPagination, TblContainer, recordsAfterPaging } =
		UseTable(rows);

	const [openE, setOpenE] = useState(false);
	// get rows from database

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenE(true);
	};

	const getRows = async () => {
		const res = await axios.get("http://localhost:5000/user/");
		setRows(res.data);
	};

	// delete row from database
	const deleteRow = async (id) => {
		await axios.delete(`http://localhost:5000/user/${id}`);
		getRows();
	};

	// update row in database
	const updateRow = async (id, data) => {
		await axios.put(`http://localhost:5000/user/${id}`, data);
		getRows();
	};

	const createRow = async (data) => {
		await axios
			.post("http://localhost:5000/user/create", data)
			.then((res) => {
				console.log(res);
				getRows();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getRows();
	}, []);

	return (
		<div>
			<Paper
				style={{
					marginBottom: 20,
					padding: 12,
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h6">FinStreet Dashboard</Typography>

				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						setOpenPopup(true);
					}}
				>
					Create
				</Button>
			</Paper>
			<Paper>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPaging().map((row, index) => {
							return (
								<TableRow key={index}>
									<TableCell component="th" scope="row" align="center">
										<Avatar alt="img" src={row.user_image} />
									</TableCell>
									<TableCell align="center">{row.user_name}</TableCell>
									<TableCell align="center">{row.user_email}</TableCell>
									<TableCell align="center">{row.user_password}</TableCell>
									<TableCell align="center">{row.total_orders}</TableCell>
									<TableCell align="center">{row.createdAt}</TableCell>
									<TableCell align="center">
										<ActionButton
											color="primary"
											onClick={() => {
												openInPopup(row);
											}}
										>
											<EditOutlinedIcon fontSize="small" />
										</ActionButton>

										<ActionButton
											color="secondary"
											onClick={() => {
												deleteRow(row.id);
											}}
										>
											<DeleteForeverRoundedIcon fontSize="small" />
										</ActionButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</TblContainer>
			</Paper>
			<TblPagination />

			{/* all popup */}
			<CreateModal
				open={openPopup}
				handleClose={() => setOpenPopup(false)}
				createRow={createRow}
			/>
			{recordForEdit != null && (
				<EditModal
					openE={openE}
					handleCloseE={() => setOpenE(false)}
					updateRow={updateRow}
					row={recordForEdit}
				/>
			)}
		</div>
	);
}
