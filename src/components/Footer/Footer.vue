<script setup></script>

<template>
  <footer>
    <p>Made with<span>❤️</span> by <a href="#"> Abel</a>.</p>
  </footer>
</template>

<style scoped>
  footer {
    width: 100%;
    margin: 2rem auto;
    text-align: center;
    color: var(--text-sec-color);
  }

  p {
    color: white;
    margin: 0;
    opacity: 0.75;
    font-size: 0.75em;
  }

  span {
    margin: 0 0.35rem;
    font-size: 0.75em;
  }

  a {
    color: inherit;
    text-decoration: underline var(--highlighted-color);
  }
</style>