<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @add-sub-resource="handleAddSubResource"
    >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button slot="header"  v-permission="'permission:resource:add'" size="small" type="primary" @click="addRootRow"><i class="el-icon-plus"/> 新增</el-button>

        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetTree, AddObj, UpdateObj, DelObj, GetObj } from './api'
import foreach from 'lodash.foreach'
export default {
  name: 'Resource',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return GetTree(query).then(ret => {
        const list = ret.data
        ret.data = {
          current: 1,
          size: 10000,
          total: 100,
          records: list
        }
        // -------默认不展开树------
        // setTimeout(() => { // 注意：有风险，当后台返回数据很快，并且列表复杂渲染速度很慢，this.getD2Crud().$refs.elTable会报空指针异常
        //   const data = this.getD2Crud().$refs.elTable.store.states.treeData
        //   if (data != null) {
        //     foreach(data, (value, key) => {
        //       // 展开两层
        //       if (value.children && value.level <= 1) {
        //         value.expanded = true
        //       }
        //     })
        //   }
        // }, 1)
        return ret
      })
    },
    clearResourceTreeDictCache () {
      d2CrudPlus.util.dict.clear('/auth.menu/tree')
    },
    addRequest (row) {
      this.clearResourceTreeDictCache()
      return AddObj(row)
    },
    updateRequest (row) {
      this.clearResourceTreeDictCache()
      return UpdateObj(row)
    },
    delRequest (row) {
      this.clearResourceTreeDictCache()
      return DelObj(row.id)
    },
    infoRequest (row) {
      return GetObj(row.id)
    },
    handleAddSubResource ({ index, row }) {
      this.addRow({ parentId: row.id })
    },
    addRootRow () {
      this.addRow({ parentId: 0 })
    }

  }
}
</script>
