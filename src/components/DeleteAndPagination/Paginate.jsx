import React from "react";

function Paginate({ pagenationDetail }) {
	let numPages = [];
	let total = pagenationDetail.user ? pagenationDetail.user.length : 0;
	let userPerPage = pagenationDetail.userPerPage;

	for (let i = 1; i <= Math.ceil(total / userPerPage); i++) {
		numPages.push(i);
	}

	return (
		<div className="pagination">
			<nav>
				<ul class="pagination">
					<li class="page-item">
						<a
							onClick={() => {
								pagenationDetail.nextPage(1);
							}}
							class="page-link"
							href="#"
							aria-label="Previous"
						>
							<span aria-hidden="true">&laquo;</span>
							<span aria-hidden="true">&laquo;</span>
							<span class="sr-only">Previous</span>
						</a>
					</li>
					<li
						class={
							pagenationDetail.currentPage == 1
								? "page-item disabled"
								: "page-item"
						}
					>
						<a
							onClick={() => {
								pagenationDetail.nextPage(pagenationDetail.currentPage - 1);
							}}
							class="page-link"
							href="#"
							aria-label="Previous"
						>
							<span aria-hidden="true">&laquo;</span>
							<span class="sr-only">Previous</span>
						</a>
					</li>
					{numPages.map(function (number) {
						return (
							<li class="page-item">
								<a
									class="page-link"
									onClick={() => {
										pagenationDetail.nextPage(number);
									}}
									href="#"
								>
									{number}
								</a>
							</li>
						);
					})}

					<li
						class={
							pagenationDetail.currentPage == Math.ceil(total / userPerPage)
								? "page-item disabled"
								: "page-item"
						}
					>
						<a
							onClick={() => {
								pagenationDetail.nextPage(pagenationDetail.currentPage + 1);
							}}
							class="page-link"
							href="#"
							aria-label="Next"
						>
							<span aria-hidden="true">&raquo;</span>
							<span class="sr-only">Next</span>
						</a>
					</li>

					<li class="page-item">
						<a
							onClick={() => {
								pagenationDetail.nextPage(Math.ceil(total / userPerPage));
							}}
							class="page-link"
							href="#"
							aria-label="Next"
						>
							<span aria-hidden="true">&raquo;</span>
							<span aria-hidden="true">&raquo;</span>
							<span class="sr-only">Next</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Paginate;
