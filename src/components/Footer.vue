<template>
  <footer>
    <div class="container">
      <div>
        <h2>About</h2>
        <div>
          <span style="display: inline-block;">Yushun Zeng 2023 | Product Catalogue</span>
        </div>
      </div>

      <div class="icon">
        <a class="sci" href="https://github.com/D18130495/catalogue-client" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" size="2xl" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import '@/assets/css/index.css'

export default {
  name: "FooterComponent"
}
</script>

<style scoped/>
