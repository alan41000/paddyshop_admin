<template>
  <div>
      <div v-if="this.scope.row.status === 0">待确认</div>
      <div v-if="this.scope.row.status === 1">待支付</div>
      <div v-if="this.scope.row.status === 2">待发货</div>
      <div v-if="this.scope.row.status === 3">已发货</div>
      <div v-if="this.scope.row.status === 4">已完成</div>
      <div v-if="this.scope.row.status === 5">已取消</div>
      <div v-if="this.scope.row.status === 6">已关闭</div>
      <div class="success" v-if="this.scope.row.pay_status === 1">已支付</div>
      <div class="warn" v-if="this.scope.row.pay_status === 2">已退款</div>
      <div class="warn" v-if="this.scope.row.pay_status === 3">部分退款</div>
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
.info{ width:100%; color: #c0c4cc; padding:10px;display: block;}
.info-left{width:30%; float: left;}
.info-right{width:70%; float: left;}
.goods{ width: 100%; padding:10px;display: block;}
.items{ width: 100%; float: left;}
.items-left{width:13%; float: left;}
.items-right{width:80%; float: left; line-height: 2;}
.items-right .title{ font-size: 16px; width: 100%;}
.items-right .price-info{  width: 100%;}
.warn{ color: #dd514c;}
.success{ color: #5eb95e;}
</style>
