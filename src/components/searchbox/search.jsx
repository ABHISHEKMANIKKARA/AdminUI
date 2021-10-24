import React from "react";
import "./search.css";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";

function Search() {
	const userForFilter = useSelector((state) => state.users.forFilter);
	const dispatch = useDispatch();

	function handleOnSearchEvent(event) {
		const filteredBySearch = userForFilter.filter((item) => {
			return Object.keys(item).some((key) => {
				if (item[key])
					return item[key]
						.toLowerCase()
						.includes(event.target.value.toLowerCase());
			});
		});
		dispatch(allActions.setUser(filteredBySearch, userForFilter));
	}
	return (
		<div className="container">
			<div class="input-group input-group-sm mb-3">
				<div class="input-group-prepend"></div>
				<input
					type="text"
					placeholder="Search by name email or role"
					onChange={handleOnSearchEvent}
					class="form-control"
					aria-label="Small"
					aria-describedby="inputGroup-sizing-sm"
				/>
			</div>
		</div>
	);
}

export default Search;
