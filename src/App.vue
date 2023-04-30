<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  metaInfo: {
    title: 'Product catalogue'
  }
}
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
