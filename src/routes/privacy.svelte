<script context="module">
	let pageKey = 'PRIVACY';

	export async function load({ fetch }) {
		let pageTitle = pageKey;
		let htmlContent = 'Error loading page content please check your site configuration';

		const res = await fetch(`/api/content/${pageKey}`);

		if (res.ok) {
			const data = await res.json();
			pageTitle = data.page.pageTitle;
			htmlContent = data.page.content;
		}

		return {
			props: {
				pageTitle: pageTitle,
				htmlContent: htmlContent
			}
		};
	}
</script>

<script>
	import ContentLayoutContainer from '../components/contentLayoutContainer.svelte';

	export let pageTitle;
	export let htmlContent;
</script>

<ContentLayoutContainer {pageTitle} {htmlContent} />
