import React from "react";
import "./DeleteAndPagination.css";
import allActions from "../../actions";
import Paginate from "./Paginate";
import { useSelector, useDispatch } from "react-redux";

function DeleteAndPagination(props) {
	const user = useSelector((state) => state.users.users);
	const userForFilter = useSelector((state) => state.users.forFilter);
	const dispatch = useDispatch();

	function deleteSelectedItem() {
		let itemRemain = user.filter((item) => {
			if (item.isChecked) return false;
			else return true;
		});
		let check = document.getElementById("defaultCheck1");
		check.checked = false;
		dispatch(allActions.setUser(itemRemain, [...userForFilter]));
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<button
						onClick={deleteSelectedItem}
						type="button"
						class="delbtn btn btn-danger"
					>
						Delete Selected
					</button>
				</div>
				<div className="col-12">
					<Paginate pagenationDetail={props.pagenationDetail} />
				</div>
			</div>
		</div>
	);
}

export default DeleteAndPagination;
