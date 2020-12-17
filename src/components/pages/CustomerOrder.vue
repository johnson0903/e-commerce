<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <router-link
          to="/index"
          class="navbar-brand"
        >
          <img
            src="https://cdn.cybassets.com/s/files/8891/theme/27159/assets/img/navbar_logo.png?1567651523"
            alt=""
            height="30"
          >
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbarCollapse"
          class="collapse navbar-collapse"
        >
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a
                class="nav-link"
                href="#"
              >新品上市 <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >服飾</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >鞋款</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >板身</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <button
                id="cartDropdownLink"

                class="btn btn-light dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-lg fa-shopping-bag" />
                <span
                  v-show="cart.carts.length"
                  class="badge badge-pill badge-danger"
                >{{ cart.carts.length }}</span>
              </button>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="cartDropdownLink"
              >
                <table
                  class="table"
                >
                  <thead>
                    <th />
                    <th>品名</th>
                    <th width="80">
                      數量
                    </th>
                    <th class="text-right">
                      單價
                    </th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in cart.carts"
                      :key="item.id"
                    >
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="removeCartItem(item.id)"
                        >
                          <i class="far fa-trash-alt" />
                        </button>
                      </td>
                      <td class="align-middle">
                        {{ item.product.title }}
                      </td>
                      <td class="align-middle">
                        {{ item.qty }}/{{ item.product.unit }}
                      </td>
                      <td class="align-middle text-right">
                        {{ item.final_total }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colspan="3"
                        class="text-right"
                      >
                        總計
                      </td>
                      <td class="text-right">
                        {{ cart.total }}
                      </td>
                      <td

                        class="text-right"
                      >
                        <button
                          v-show="cart.carts.length"
                          class="btn btn-success"
                          @click="createOrder"
                        >
                          結帳
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <loading :active.sync="isLoading" />
    <div class="container main-content">
      <div class="row mt-4">
        <div class="col-md-12">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              />
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              />
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              />
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src="@/assets/img/main_slider_item_1_lg.png"
                  alt="First slide"
                >
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="@/assets/img/main_slider_item_2_lg.png"
                  alt="Second slide"
                >
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="@/assets/img/main_slider_item_3_lg.png"
                  alt="Third slide"
                >
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              />
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              />
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="col-md-12 my-3">
          <ul
            id="pills-tab"
            class="nav nav-tabs mb-3"
            role="tablist"
          >
            <li class="nav-item">
              <a
                id="pills-home-tab"
                href="#"
                class="nav-link active"
                data-toggle="pill"
                role="tab"
                aria-selected="true"
                @click.prevent="filterType = 'all'"
              >All</a>
            </li>
            <li class="nav-item">
              <a
                id="pills-profile-tab"
                href="#"
                class="nav-link"
                data-toggle="pill"
                role="tab"
                aria-selected="false"
                @click.prevent="filterType = '上衣'"
              >上衣</a>
            </li>
            <li class="nav-item">
              <a
                id="pills-contact-tab"
                href="#"
                class="nav-link"
                data-toggle="pill"
                role="tab"
                aria-selected="false"
                @click.prevent="filterType = '滑板'"
              >滑板</a>
            </li>
            <li class="nav-item">
              <a
                id="pills-contact-tab"
                href="#"
                class="nav-link"
                data-toggle="pill"
                role="tab"
                aria-selected="false"
                @click.prevent="filterType = '滑板鞋'"
              >滑板鞋</a>
            </li>
          </ul>
        </div>
        <div
          v-for="product in filteredProducts"
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
              <p class="card-text overflow-hidden">
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
                @click="addToCart(product.id)"
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
    </div>
    <footer class="bg-dark text-light py-3">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item">
            © Copright 2020 Johnson's Jimi Skate shop
          </li>
          <li class="list-inline-item">
            <a
              class="text-info"
              href="#"
            >
              <i
                class="fa fa-instagram"
                aria-hidden="true"
              /> Instagrame</a>
          </li>
          <li class="list-inline-item">
            <a
              class="text-info"
              href="#"
            >
              <i
                class="fa fa-facebook-square"
                aria-hidden="true"
              /> Facebook</a>
          </li>
          <li class="list-inline-item">
            <a
              class="text-info"
              href="#"
            >About</a>
          </li>
        </ul>
      </div>
    </footer>
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
              @click="addToCart(selectedProduct.id, selectedProduct.num)"
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
      filterType: 'all',
      selectedProduct: {},
      cart: {},
      status: {
        loadingItem: ''
      },
      isLoading: false,
      form: {
        user: {
          name: 'johnson0903',
          email: 'johnson50701@gmail.com',
          tel: '0912345678',
          address: '新北市新店區幸福路1號'
        },
        message: ''
      }
    }
  },
  computed: {
    filteredProducts () {
      var vm = this
      if (vm.filterType === 'all') {
        return vm.products
      } else {
        var tempProducts = []
        vm.products.forEach(item => {
          if (item.category === vm.filterType) {
            tempProducts.push(item)
          }
        })
        return tempProducts
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()
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
    },

    addToCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((response) => {
        vm.status.loadingItem = ''
        $('#productModal').modal('hide')
        this.getCart()
      })
    },
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data
        console.log(vm.cart)
        vm.isLoading = false
      })
    },
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(url).then((response) => {
        vm.getCart()
        vm.isLoading = false
      })
    },
    createOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.isLoading = true
      this.$http.post(url, { data: order }).then(response => {
        console.log('訂單已建立', response)
        vm.isLoading = false
      })
    }
  }
}
</script>

<style>
.main-content {
  margin-top: 6rem;
}
.navbar {
  background-color: black !important;
}
.card-text {
  height: 100px;
}
.dropdown-menu {
  width: 400px;
}
</style>
