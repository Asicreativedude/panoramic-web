const filterDropdowns = document.querySelectorAll(
	'.find-a-partner-filter-dropdown'
) as NodeListOf<HTMLDivElement>;
filterDropdowns.forEach((dropdown) => {
	const isEmpty = dropdown.querySelector('.w-dyn-empty');
	if (!isEmpty) {
		dropdown.classList.add('active');
		const continentCounter = dropdown.querySelector('.continent-counter')!;
		const numberOfCountries = dropdown.querySelectorAll(
			'.find-a-partner-filter-checkbox-c'
		).length;
		continentCounter.textContent = numberOfCountries.toString();
	}
});

document
	.querySelector('.find-a-partner-clear')!
	.addEventListener('click', () => {
		(document.querySelector('.filter-clear-div')! as HTMLDivElement).click();
	});
