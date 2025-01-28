<template>
  <div>
    <h2>User Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserFormLogin",
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        // Handle successful login (e.g., store token, redirect, etc.)
        const data = await response.json();
        console.log('Login successful:', data);

      } catch (error) {
        this.error = error.message;
      }
    }
  }
}
</script>