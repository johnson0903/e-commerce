<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        @click="openModal(true)"
      >
        建立新產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">
          分類
        </th>
        <th>產品名稱</th>
        <th
          width="120"
          class="text-right"
        >
          原價
        </th>
        <th
          width="120"
          class="text-right"
        >
          售價
        </th>
        <th width="100">
          是否啟用
        </th>
        <th width="150">
          編輯
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(product, key) in products"
          :key="key"
        >
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-right">
            {{ product.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ product.price | currency }}
          </td>

          <td>
            <span
              v-if="product.is_enabled"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, product)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteModal(product)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pagination="pagination"
      @emitPage="getProducts"
    />
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{'disabled': !pagination.has_pre}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getProducts(pagination.current_page - 1 )"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          v-for="page in pagination.total_pages"
          :key="page"
          class="page-item"
          :class="{'active': pagination.current_page === page}"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(page)"
          >{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{'disabled': !pagination.has_next}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getProducts(pagination.current_page + 1 )"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav> -->

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
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>新增產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label
                    for="customFile"
                  >或 上傳圖片
                    <i
                      v-if="status.fileUploading"
                      class="fas fa-spinner fa-spin"
                    />
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  >
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="delProductModal"
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
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除產品</span>
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
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  name: 'Products',
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.isLoading = false
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    openDeleteModal (product) {
      this.tempProduct = Object.assign({}, product)
      $('#delProductModal').modal('show')
    },
    updateProduct () {
      console.log(this)
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          this.$bus.$emit('message:push', response.data.message, 'success')
          vm.getProducts()
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    deleteProduct () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`
      const vm = this
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          $('#delProductModal').modal('hide')
          vm.getProducts()
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
          vm.status.fileUploading = false
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger')
          }
        })
    }
  }
}
</script>

<style>
</style>
