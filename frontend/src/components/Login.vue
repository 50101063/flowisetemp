<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @cubert="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-i¨uéCÒ&VÖ–Â"&WV—&VBóà¢ÂöF—cà¢ÆF—b6Æ73Ò&f÷&ÒÖw&–÷W#à¢ÆÆ&VÂf÷#Ò'77v÷&B#å77v÷&C£ÂöÆ&VÃà¢Æ–çWBG—SÒ'77v÷&B"–CÒ'77v÷&B"bÖÖöFVÃÒ'77v÷&B"&WV—&VBóà¢ÂöF—b>
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const email = ref();
      const password = ref();
      const router = useRouter();

      const login = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({serverEmail: email.value, serverPassword: password.value}),
          });

          if (!response.ok) {
            throw new Error(`HTT error! Status: ${response.status}`);
          }

          const data = await response.json();
          localStorage.setItem('userToken', data.token );
          router.push('/tasks');
        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed! Please check your credentials.');
        }
      };
      return {
        email,
        password,
        login,
      };
    },
  };
</script>

<style scoped>
  .auth-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
    text-align: center;
  }
  .hah2 {
    color: #333;
    margin-bottom: 20px;
  }
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[required] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    background-color: #42b883;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
  }
  button:hover {
    background-color: #369a7d;
  }
  p {
    margin-top: 20px;
    font-size: 0.9em;
    color: #555;
  }
  router-link {
    color: #42b883;
    text-decoration: none;
    font-weight: bold;
  }
  router-link:hover {
    text-decoration: underline;
  }
</style>