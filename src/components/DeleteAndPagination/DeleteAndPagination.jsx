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
		dispatch(allActions.setUser(itemRemain, [...itemRemain]));
	}

	return (
		<div className="row g-2">
			<div className="col-md-4 mb-3">
				<button
					onClick={deleteSelectedItem}
					type="button"
					class="btn btn-danger"
				>
					Delete Selected
				</button>
			</div>
			<div className="col-8">
				<Paginate pagenationDetail={props.pagenationDetail} />
			</div>
		</div>
	);
}

export default DeleteAndPagination;
