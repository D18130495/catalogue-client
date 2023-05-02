<template>
  <div class="productContainer">
    <div class="backButton">
      <el-page-header @back="goBack" content="Edit Product"></el-page-header>
    </div>

    <div class="product">
        <div style="clear: both;"></div>
        <div id="content">
          <div class="imageContainer">
            <img class="titleImage" :src="product.thumbnail" alt="Product Image" />
            <div class="subImages">
              <ul>
                <li v-for="(img, index) in product.images" :key="index">
                  <img v-if="index < 4" :src="img" alt="Product Image">
                </li>
              </ul>
            </div>
          </div>

          <div class="productInformationContainer">
            <div class="productInformation">
              <h2>{{ product.title }}</h2>
              <div class="productPrice">
                <span class="color">Price:</span>
                <span class="prices">€ {{ discountPrice }}</span>
                <span class="discount">Original price:<span class="discountPrices"> € {{ product.price }}</span></span>
              </div>

              <div class="productBrand">
                <p></p>
                <span>Brand: </span>
                <span class="productText">{{ product.brand }}</span>
                <p></p>
                <span>Category: </span>
                <span class="productText">{{ product.category }}</span>
                <p></p>
                <span>Stock: </span>
                <span class="productText"> {{ product.stock }}</span>
              </div>

              <div class="productRate">
                <p></p>
                <span>Rating: </span>
                <el-rate
                    style="margin-top: 15px"
                    v-model=product.rating
                    disabled
                    show-score
                    text-color="#ff9900">
                </el-rate>
              </div>

              <div class="productDescription">
                <p></p>
                <span>Description: </span>
                <p>{{ product.description }}</p>
              </div>

              <div class="productOperation">
                <a :href="`/editProduct/${product.id}`"><button class="update">Update</button></a>
                <a><button class="delete" @click="deleteProductByProductId">Delete</button></a>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import productApi from '@/api/product';


export default {
  name: "ProductDetail",
  data() {
    return {
      product: {},
      discountPrice: ''
    }
  },
  created() {
    this.getProductByProductId(this.$route.params.id)
  },
  methods: {
    getProductByProductId(productId) {
      productApi.getProductByProductId(productId)
          .then(response => {
            this.product = response.data.data
            const discountPrice = this.product.price * (1 - this.product.discountPercentage / 100);
            this.discountPrice = discountPrice.toFixed(2);
          })
          .catch(error => {
            console.log(error)
          })
    },
    deleteProductByProductId() {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        productApi.deleteProductByProductId(this.$route.params.id)
            .then(response => {
              this.$notify({
                title: 'Success',
                message: response.data.message,
                type: 'success',
                duration: 1500
              });

              this.$router.push({ name: "Home" });
            })
            .catch(error => {
              console.log(error)
            })
      }).catch(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete canceled',
          type: 'warning',
          duration: 1500
        });
      });
    },
    goBack() {
      this.$router.push({ name: "Home" });
    },
  }
}
</script>

<style scoped>

</style>
