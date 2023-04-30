<template>
  <div class="home">
    <div class="tableContainer">
    <div id="productDetailContainer">
<!--      <el-select-->
<!--          v-model="value"-->
<!--          multiple-->
<!--          filterable-->
<!--          remote-->
<!--          reserve-keyword-->
<!--          placeholder="Please enter a keyword"-->
<!--          :remote-method="remoteMethod"-->
<!--          :loading="loading">-->
<!--        <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
    </div>

    </div>
  </div>
</template>

<script>
import productApi from '@/api/product'


export default {
  name: "HomePage",
  data() {
    return {

    }
  },
  created() {
    this.getProductByProductId(1)
  },
  methods: {
    getProductByProductId(productId) {
      productApi.getProductByProductId(productId)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped/>
