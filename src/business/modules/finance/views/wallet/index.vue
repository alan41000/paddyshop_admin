<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
        >
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
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
import * as api from './api'
export default {
  name: 'wallet',
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
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    infoRequest (row) {
      return api.GetObj(row.id)
    },
  }
}
</script>
