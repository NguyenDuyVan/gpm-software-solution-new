<template>
  <section class="flex items-center h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
        <p class="mt-4 mb-8 dark:text-gray-600">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <NuxtLink
          rel="noopener noreferrer"
          to="/"
          class="px-8 py-3 font-semibold rounded dark:bg-green-600 dark:text-gray-50"
          >Back to homepage</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'NotFoundPage',
  };
</script>

<style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
    color: #343a40;
  }

  .not-found h1 {
    font-size: 6rem;
    margin: 0;
  }

  .not-found p {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .home-link {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .home-link:hover {
    background-color: #0056b3;
  }
</style>
