<script>
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="relative">
	<div class="container flex flex-col lg:flex-row items-center gap-12 mt-14 lg:mt-28 px-4">
		<!-- Content -->
		<div class="flex flex-1 flex-col items-center lg:items-start">
			<h2 class="font-bold text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
				Upload your files
			</h2>
			<p class="text-lg text-center lg:text-left mb-6">Storage for your favourite digital assets</p>
			<div class="flex justify-center flex-wrap gap-6 mb-6">
				<a class="bg-black text-white py-2 px-4 rounded-lg" href="/auth/signin">Sign In</a>
			</div>
			<div class="flex justify-center flex-wrap gap-2 text-sm ">
				Don't have an account?<a href="/auth/signup">Sign up</a>
			</div>
		</div>
		<!-- Image -->
		<div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10 hidden lg:block">
			<img class="w-4/6 h-4/6 sm:w-4/6 sm:h-4/6 md:h-4/6 md:h-4/6" src="./home.png" alt="" />
		</div>
	</div>
</section>
