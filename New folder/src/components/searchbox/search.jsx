import React from "react";
import "./search.css";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";

function Search() {
	const userForFilter = useSelector((state) => state.users.forFilter);
	const dispatch = useDispatch();

	function handleOnSearchEvent(event) {
		console.log(event.target.value);
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
			<div className="row">
				<div className="col-12">
					<div class="input-group input-group-sm mb-3">
						<div class="input-group-prepend"></div>
						<input
							type="text"
							placeholder="Search by name email or r"
							onChange={handleOnSearchEvent}
							class="form-control"
							aria-label="Small"
							aria-describedby="inputGroup-sizing-sm"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
