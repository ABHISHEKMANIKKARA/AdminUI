import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import utils from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import icons from "./icons.js";
import DeleteAndPagination from "../../components/DeleteAndPagination/DeleteAndPagination";
import "./table.css";

function Table() {
	const [ISmodalOpen, setModal] = useState(false);
	const [modalData, setModalData] = useState({});
	const user = useSelector((state) => state.users.users);
	const userForFilter = useSelector((state) => state.users.forFilter);

	const dispatch = useDispatch();
	let allUsers;

	useEffect(async () => {
		allUsers = await utils.makeApiCall(
			"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
		);

		dispatch(allActions.setUser(allUsers, [...allUsers]));
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const [userPerPage, setUserPerPage] = useState(10);

	const indexOfLastUser = currentPage * userPerPage;
	const indexOfFirstUser = indexOfLastUser - userPerPage;
	const currentUser = user
		? user.slice(indexOfFirstUser, indexOfLastUser)
		: false;

	function nextPage(i) {
		setCurrentPage(i);
	}

	function onModalOpen(item) {
		setModal(true);
		setModalData({ ...item });
	}

	function checkBoxClick(event) {
		let { name, checked } = event.target;
		let CheckedUser;

		if (name == "selectall") {
			CheckedUser = user.map(function (item, index) {
				if (index >= indexOfFirstUser && index < indexOfLastUser)
					return { ...item, isChecked: checked };
				else return { ...item, isChecked: false };
			});
		} else {
			CheckedUser = user.map(function (item) {
				if (name == item.name + `${item.id}`) {
					return { ...item, isChecked: checked };
				} else return item;
			});
		}
		dispatch(allActions.setUser(CheckedUser, [...userForFilter]));
	}

	function handleDeleteIconClick(id) {
		let newItems = user.filter(function (item) {
			return item.id != id;
		});
		dispatch(allActions.setUser(newItems, [...newItems]));
	}

	function handleChange(e, data) {
		let modifiedfield = e.target.name;

		if (modifiedfield == "name") {
			setModalData({ ...data, name: e.target.value });
		}

		if (modifiedfield == "email") {
			setModalData({ ...data, email: e.target.value });
		}

		if (modifiedfield == "role") {
			setModalData({ ...data, role: e.target.value });
		}
	}

	function saveEditedData(data) {
		setModal(false);
		let changedItemIndex = user.findIndex((item) => {
			return item.id == data.id;
		});
		user[changedItemIndex] = modalData;
		dispatch(allActions.setUser(user, [...user]));
	}

	return (
		<div className="container">
			<table className="table">
				<thead>
					<tr>
						<th scope="col">
							<input
								type="checkbox"
								name="selectall"
								onClick={checkBoxClick}
								value=""
								id="defaultCheck1"
							/>
						</th>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Role</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{currentUser
						? currentUser.map((item) => (
								<tr>
									<td>
										<input
											name={item.name + `${item.id}`}
											onClick={checkBoxClick}
											checked={item.isChecked ? item.isChecked : false}
											type="checkbox"
											value=""
											id="defaultCheck2"
										/>
									</td>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.role}</td>
									<td>
										<div className="icons">
											<div>
												<a
													data-target="#exampleModal"
													data-backdrop="static"
													data-keyboard="false"
													data-toggle="modal"
													onClick={() => {
														onModalOpen(item);
													}}
												>
													{icons.editIcon}
												</a>
											</div>
											<div>
												<a
													onClick={() => {
														handleDeleteIconClick(item.id);
													}}
												>
													{icons.deleteIcon}
												</a>
											</div>
										</div>
									</td>
								</tr>
						  ))
						: ""}
				</tbody>
			</table>

			{ISmodalOpen ? (
				<div
					class="modal fade"
					id="exampleModal"
					tabindex="-1"
					role="dialog"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">
									Details
								</h5>

								<button
									type="button"
									class="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={() => {
										setModal(false);
									}}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<label for="exampleFormControlTextarea1">Name</label>
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Name"
									name="name"
									onChange={(e) => {
										handleChange(e, modalData);
									}}
									Value={modalData.name}
								/>
								<label for="exampleInputEmail1">Email address</label>
								<input
									type="email"
									class="form-control"
									id="exampleInputEmail1"
									name="email"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									Value={modalData.email}
									onChange={(e) => {
										handleChange(e, modalData);
									}}
								/>
								<label for="exampleFormControlTextarea1">Role</label>
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Role"
									name="role"
									Value={modalData.role}
									onChange={(e) => {
										handleChange(e, modalData);
									}}
								/>
							</div>
							<div class="modal-footer">
								<button
									type="button"
									class="btn btn-secondary"
									data-dismiss="modal"
								>
									Close
								</button>
								<button
									type="button"
									onClick={() => {
										saveEditedData(modalData);
									}}
									data-dismiss="modal"
									class="btn btn-primary"
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
			<DeleteAndPagination
				pagenationDetail={{
					userPerPage,
					currentPage,
					currentUser,
					user,
					nextPage,
				}}
			/>
		</div>
	);
}

export default Table;
