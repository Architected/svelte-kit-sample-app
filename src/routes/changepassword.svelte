<script>
	import { hasCompleteToken } from '../helper/storageHelper';
	import {
		AuthStore,
		authDispatch,
		ProfileStore,
		profileDispatch
	} from '../store/architectedStore';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../helper/urlConstants';
	import { onMount } from 'svelte';
	import AccountContainer from '../components/account/accountContainer.svelte';
	import { profileClient } from '../service/setup';

	onMount(() => {
		if (!hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('SIGNOUT'), true);
		}
	});

	const changePasswordHandler = async (data) => {
		const responseData = await profileClient.changePassword(
			data.currentPassword,
			data.newPassword,
			profileDispatch,
			$AuthStore.bearerToken.tokenValue
		);
	};
</script>

<div class="w-full flex flex-col px-5">
	<div class="w-full flex flex-row justify-between p-5">
		<div class="flex space-x-4">
			<h2 class="font-bold text-3xl">Account Settings</h2>
		</div>
		<div class="flex">
			<div class="mt-2">&nbsp;</div>
		</div>
	</div>
	<AccountContainer
		changePassword={changePasswordHandler}
		callInProgress={$ProfileStore.callInProgress}
		warningMessage={$ProfileStore.warningMessage}
		errorMessage={$ProfileStore.errorMessage}
		successMessage={$ProfileStore.successMessage}
	/>
</div>
