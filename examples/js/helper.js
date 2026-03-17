document.addEventListener('DOMContentLoaded', () => {
	const copyFromTarget = (button, targetId) => {
		const target = document.getElementById(targetId);
		if (target === null) {
			return;
		}

		navigator.clipboard.writeText(target.innerText).then(() => {
			const originalText = button.dataset.originalText || button.textContent;
			button.dataset.originalText = originalText;
			button.textContent = 'Copied!';
			window.setTimeout(() => {
				button.textContent = originalText;
			}, 1200);
		}).catch(err => {
			console.error('Error copying text: ', err);
		});
	};

	const modeToggle = document.getElementById('modeToggle');
	if (modeToggle !== null) {
		modeToggle.addEventListener('click', () => {
			const currentTheme = document.documentElement.getAttribute('data-bs-theme');
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-bs-theme', newTheme);
			modeToggle.textContent = `Toggle to ${newTheme === 'dark' ? 'Light' : 'Dark'} Mode`;

			const hljsTheme = document.getElementById('hljsTheme');
			if (hljsTheme !== null) {
				cssTheme = newTheme === 'light' ? 'stackoverflow-light' : 'stackoverflow-dark';
				hljsTheme.setAttribute('href', `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9/build/styles/${cssTheme}.min.css`);
			}
		});
	}

	const copyButton = document.getElementById('copyButton');
	if (copyButton !== null) {
		copyButton.addEventListener('click', () => {
			copyFromTarget(copyButton, 'codeBlock');
		});
	}

	document.querySelectorAll('[data-copy-target]').forEach((button) => {
		button.addEventListener('click', () => {
			copyFromTarget(button, button.dataset.copyTarget);
		});
	});
});