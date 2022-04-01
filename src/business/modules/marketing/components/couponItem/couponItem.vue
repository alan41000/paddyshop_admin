<!--
 * @Author: Alan Leung
-->
<template>
  <div>
      <div class="title">
          {{ this.scope.row.couponInfo.name }}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
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
.title{ font-size: 14px!important; margin-left: 10px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
</style>