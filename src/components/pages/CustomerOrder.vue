<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="row mt-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-4 mb-4"
      >
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-repeat: no-repeat; background-size: contain; background-position: center"
            :style="{backgroundImage: `url(${product.imageUrl})`}"
          />
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
            <h5 class="card-title">
              <a
                href="#"
                class="text-dark"
              >{{ product.title }}</a>
            </h5>
            <p class="card-text">
              {{ product.content }}
            </p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                v-if="!product.price"
                class="h5"
              >
                {{ product.origin_price }} 元
              </div>
              <del
                v-if="product.price"
                class="h6"
              >
                {{ product.origin_price }}
              </del>
              <div
                v-if="product.price"
                class="h5"
              >
                現在只要 {{ product.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(product.id)"
            >
              <i
                v-if="status.loadingItem === product.id"
                class="fas fa-spinner fa-spin"
              />
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
            >
              <i
                v-if="status.loadingItem === product.id"
                class="fas fa-spinner fa-spin"
              />
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              {{ selectedProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="selectedProduct.imageUrl"
              class="img-fluid"
              alt=""
            >
            <blockquote class="blockquote mt-3">
              <p class="mb-0">
                {{ selectedProduct.content }}
              </p>
              <footer class="blockquote-footer text-right">
                {{ selectedProduct.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                v-if="!selectedProduct.price"
                class="h4"
              >
                {{ selectedProduct.origin_price }} 元
              </div>
              <del
                v-if="selectedProduct.price"
                class="h6"
              >原價 {{ selectedProduct.origin_price }} 元</del>
              <div
                v-if="selectedProduct.price"
                class="h4"
              >
                現在只要 {{ selectedProduct.price }} 元
              </div>
            </div>
            <select
              v-model="selectedProduct.num"
              name=""
              class="form-control mt-3"
            >
              <option
                v-for="num in 10"
                :key="num"
                :value="num"
              >
                選購 {{ num }} {{ selectedProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ selectedProduct.price ? selectedProduct.num * selectedProduct.price : selectedProduct.num * selectedProduct.origin_price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(selectedProduct.id, selectedProduct.num)"
            >
              <i
                v-if="selectedProduct.id === status.loadingItem"
                class="fas fa-spinner fa-spin"
              />
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      products: [],
      selectedProduct: {},
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.products = response.data.products
        vm.isLoading = false
        // vm.pagination = response.data.pagination
      })
    },
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(url).then((response) => {
        vm.selectedProduct = response.data.product
        vm.selectedProduct.num = 1
        $('#productModal').modal('show')
        vm.status.loadingItem = ''
      })
    }
  }
}
</script>

<style>

</style>
