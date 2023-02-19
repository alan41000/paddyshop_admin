<template>
  <div>
      <div>
        类型：
        <span v-if="this.scope.row.type == 1">仅退款</span>
        <span v-if="this.scope.row.type == 2">退款退货</span>
      </div>
      <div>
        原因：{{ this.scope.row.reason }}
      </div>
      <div v-if="this.scope.row.type == 2">
        数量：{{ this.scope.row.qty }}
      </div>
      <div>
        金额：<span class="price">¥{{ this.scope.row.price }}</span>
      </div>
      <div>
        说明：{{ this.scope.row.msg }}
      </div>
      <div>
        提交时间：{{ this.scope.row.create_time }}
      </div>
      <div v-if="this.scope.row.express_name !== ''">
        <div>
          快递：{{ this.scope.row.express_name }}
        </div>
        <div>
          单号：{{ this.scope.row.express_number }}
        </div>
        <div>
          退货时间：{{ this.scope.row.delivery_time }}
        </div>
      </div>
      <div v-if="this.scope.row.images !== null">
          <el-image
            v-for="(item) in this.scope.row.images"
            :key="item.id"
            style="width: 60px; height: 60px; margin:5px"
            :src="item"
            fit="cover"
            :preview-src-list="scope.row.images"></el-image>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    scope: {
      default: null
    },
    myProps: {
      default: null
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style>
.info{ width:100%; color: #c0c4cc; display: block;}
.price{ color: #dd514c;}
</style>
