<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"        
    >
      <div slot="header">
        <!-- <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  /> -->
        <el-button-group >
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"></i> 新增</el-button>
        </el-button-group>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"  />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj, BatchDel } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'region',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      multipleSelection: undefined
    }
  },
  computed: {
  },
  async mounted () {
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    async pageRequest (query) {
      const ret = await GetList(query)
      // 请至少保证有一列没有设置固定宽度，否则也会有错位问题
      // 修复合计行错位问题
      this.$nextTick(async () => { // 这里要异步执行
        // await this.$nextTick() //如果一次nextTick不行，那就两次
        this.getD2CrudTable().store.scheduleLayout()
      }) // 等待加载完成后触发重排布局

      return ret
    },
    addRequest (row) {
      return AddObj(row)
    },
    async updateRequest (row) {
      await UpdateObj(row)
      this.reloadTreeChildren(row.parent_id)
    },
    async delRequest (row) {
      await DelObj(row.id)
      this.reloadTreeChildren(row.parent_id)
    },
    reloadTreeChildren (parentId) {
      const data = this.getD2Crud().$refs.elTable.store.states.treeData
      if (data != null) {
        const item = data[parentId]
        if (item != null) {
          item.loaded = false
          item.expanded = false
        }
      }
    },
  }
}
</script>
