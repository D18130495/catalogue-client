<template>
  <header class="header">
    <nav class="navbar">
      <a href="#" class="nav-logo">Catalogue.</a>
      <ul class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
        <li class="nav-item">
          <a href="#" class="nav-link" @click="closeMenu">Home</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="closeMenu">Add product</a>
        </li>
      </ul>
      <div class="mobileMenu" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>


<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isMobileMenuOpen: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMenu() {
      this.isMobileMenuOpen = false;
    }
  }
}
</script>

<style scoped>
.mobileMenu.active .bar:nth-child(2) {
  opacity: 0;
}

.mobileMenu.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobileMenu.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>
