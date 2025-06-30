<script setup>
import { ref } from 'vue';

const email = ref(''input');
import refs('');š[\Ü™YŠ	ÉÊNÂ‚˜ÛÛœİ[XZ[H™YŠ
Š‚BIÉÊNÂ‚˜ÛÛœİ\ÜİÛÜ™H™YŠ	ÉÊNÂ˜ÛÛœİ\œ›Ü“Y\ÜØYÙHH™YŠ	ÉÊNÂ‚˜ÛÛœİ[Z]ÈHYš[™Q[Z]ÊÉÜ™YÚ\İ\”İXØÙ\ÜÉ×JNÂ‚˜ÛÛœİ[™T™YÚ\İ\ˆH\Ş[˜È

HOˆÂˆ\œ›Ü“Y\ÜØYÙK˜[YHH	ÉÎÂˆHÂˆÛÛœİ™\ÜÛœÙHH]ØZ]™]Ú
	ËÚ]Ø\KØ]]Ü™YÚ\İ\‰ËÂˆY]Ùˆ	ÔÔÕ	ËˆXY\œÎˆÂˆ	ĞÛÛ[U\IÎˆ	Ø\XØ][Û‹ÚœÛÛ‰ËˆKˆ›ÙNˆ”ÓÓ‹œİš[™ÚYJÂˆ[XZ[ˆ[XZ[˜[YKˆ\ÜİÛÜ™ˆ\ÜİÛÜ™˜[YKˆJKˆJNÂ‚ˆÛÛœİ]HH]ØZ]™\ÜÛœÙKšœÛÛŠ
NÂ‚ˆYˆ
™\ÜÛœÙK›ÚÊHÂˆ[Z]Ê	Ü™YÚ\İ\”İXØÙ\ÜÉÊNÂˆH[ÙHÂˆ\œ›Ü“Y\ÜØYÙK˜[YHH]K›Y\ÜØYÙH	Ô™YÚ\İ˜][Ûˆ˜Z[Y‰ÎÂˆBˆHØ]Ú
\œ›ÜŠHÂˆ\œ›Ü“Y\ÜØYÙK˜[YHH	Ó™]work error: ' + error.message;                                                      
  }
}
</script>

<template>
  <div class="register-container">
    <h2>Register<2>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" class="error-message">{errorMessage}</p>
    </form>
  </div>
</template>

<style scoped>
  .register-container  {
    max-width: 400px;
    margin: 2rmk auto;
    padding: 2rmg;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  }

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #555;
  }

  input(pype="text"),
  input(type="email"),
  input(type="password") {
    width: 100%;
    padding: 0.8 rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1em;
  }

  button {
    width: auto;
    padding: 0.8rem 1.2rem;
    border: none
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error-message {
    color: #d53030;
    margin-top: 1rem;
    text-align: center;
  }
}
</style>