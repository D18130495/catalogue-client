<template>
  <div class="edit">
    <div class="backButton">
      <el-page-header @back="goBack" content="Edit Product"></el-page-header>
    </div>

    <div class="mainContent">
      <div class="editTitle">
        <h1>Edit Product</h1>
      </div>

      <div class="editForm">
        <el-form :model="product" ref="product" label-width="100px">
          <el-form-item required :rules="[{ required: true, message: 'Title is required' }]" label="Title" prop="title">
            <el-input v-model="product.title"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Brand is required' }]" label="Brand" prop="brand">
            <el-input v-model="product.brand"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Category is required' }]" label="Category" prop="category">
            <el-input v-model="product.category"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Price is required' },
          { validator: validateNumber, message: 'Price must be a number' }]" label="Price" prop="price">
            <el-input v-model.number="product.price"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Discount is required' },
          { validator: validateNumber, message: 'Discount must be a number' }]" label="Discount" prop="discountPercentage">
            <el-input v-model="product.discountPercentage"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Stock is required' },
          { validator: validateNumber, message: 'Stock must be a number' }]" label="Stock" prop="stock">
            <el-input v-model="product.stock"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Rate is required' },
          { validator: validateRating, message: 'Rate should between 0 - 5' }]" label="Rate" prop="rating">
            <el-row>
              <el-col :xs="15" :sm="7" :lg="7">
                <el-rate class="form-item-rating" v-model="product.rating" :colors="colors" show-score allow-half></el-rate>
              </el-col>
              <el-col :xs="9" :sm="4" :lg="4">
                <el-input v-model="product.rating"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Description is required' }]" label="Description" prop="description">
            <el-input type="textarea" v-model="product.description"></el-input>
          </el-form-item>

          <el-form-item required :rules="[{ required: true, message: 'Thumbnail is required' }]" label="Thumbnail" prop="thumbnail">
            <el-input v-model="product.thumbnail"></el-input>
          </el-form-item>

          <el-form-item
              v-for="(image, index) in product.images"
              :label="'Image ' + (index + 1)"
              :key="index">

            <el-row>
              <el-col :xs="19" :sm="20" :lg="20">
                <el-input v-model="product.images[index]"></el-input>
              </el-col>
              <el-col :xs="4" :sm="4" :lg="4">
                <el-button @click.prevent="removeImage(image)">Delete</el-button>
              </el-col>
            </el-row>

            <img v-if="product.images[index] !== ''" class="editImage" :src=product.images[index] alt="Description of image">
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('product')">Update</el-button>
            <el-button @click="addImage">New image</el-button>
            <el-button @click="resetForm('product')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import productApi from "@/api/product";
import {Message} from "element-ui";


export default {
  name: "EditProduct",
  data() {
    return {
      product: {},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  created() {
    this.getProductByProductId(this.$route.params.id)
  },
  methods: {
    validateNumber(rule, value, callback) {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        callback();
      } else {
        callback(new Error('Please enter a valid number'));
      }
    },
    validateRating(rule, value, callback) {
      const floatValue = parseFloat(value);

      if(!isNaN(floatValue) && floatValue >= 0 && floatValue <= 5) {
        callback();
      } else {
        callback(new Error('Rate should be a number between 0 and 5'));
      }
    },
    goBack() {
      this.$router.push("/product/" + this.$route.params.id);
    },
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
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if(valid) {
          productApi.editProductByProductId(this.product)
              .then(response => {
                this.product = response.data.data

                this.$notify({
                  title: 'Success',
                  message: response.data.message,
                  type: 'success',
                  duration: 1500
                });

                // calculate the time difference
                const endTime = new Date()
                const startTime = response.config.metadata.startTime
                const duration = endTime - startTime

                // display the duration in milliseconds
                Message.success({
                  message: `Edit request took ${duration}ms to complete`,
                  showClose: true,
                  duration: 2500
                })

                this.$router.push("/product/" + this.$route.params.id);
              })
              .catch(error => {
                console.log(error)
              })
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.getProductByProductId(this.$route.params.id)
    },
    addImage() {
      this.product.images.push('');
    },
    removeImage(item) {
      var index = this.product.images.indexOf(item);
      if (index !== -1) {
        this.product.images.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
.form-item-rating {
  margin-top: 11px;
}
</style>
