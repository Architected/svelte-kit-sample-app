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
	import ProfileContainer from '../components/profile/profileContainer.svelte';
	import { profileClient } from '../service/setup';

	onMount(() => {
		if (!hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('SIGNOUT'), true);
		}
	});

	const loadProfile = async () => {
		await profileClient.getProfile(profileDispatch, $AuthStore.bearerToken.tokenValue);
	};

	if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
		loadProfile().then(() => {});
	}

	const updateProfileHandler = async (data) => {
		const updatedProfile = { ...$ProfileStore.profile, ...data };
		await profileClient.saveProfile(
			updatedProfile,
			profileDispatch,
			$AuthStore.bearerToken.tokenValue
		);
	};
</script>

<div class="w-full flex flex-col px-5">
	<div class="w-full flex flex-row justify-between p-5">
		<div class="flex space-x-4">
			<h2 class="font-bold text-3xl">My Profile</h2>
		</div>
		<div class="flex">
			<div class="mt-2">&nbsp;</div>
		</div>
	</div>
	<ProfileContainer
		profile={$ProfileStore.profile}
		isLoadingItem={$ProfileStore.isLoadingItem}
		loadingError={$ProfileStore.loadingError}
		updateProfile={updateProfileHandler}
		isUpdatingItem={$ProfileStore.isUpdatingItem}
		updatingError={$ProfileStore.updatingError}
	/>
</div>
