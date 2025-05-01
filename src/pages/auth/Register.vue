<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded">
    <h1 class="text-xl font-bold mb-4">Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Name" class="w-full mb-2 p-2 border rounded" />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-2 p-2 border rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" class="w-full bg-green-500 text-white py-2 rounded">Register</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const name = ref('');
  const email = ref('');
  const password = ref('');

  const handleRegister = async () => {
    await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
    });
    alert('Registered successfully!');
  };
</script>
