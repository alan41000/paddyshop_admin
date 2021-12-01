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
            <!-- <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  /> -->
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
import { request } from '@/api/service'

export default {
  name: 'Comments',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    doCellDataChange(context){
      // 上下架状态更新
      this.enableStatusUpdata(context,'goods.comments','show');
    },

    // 开关启用更新组件函数
    enableStatusUpdata(context,controller,field)
    {
      if(context['value']['value'])
      {
        var data = {
          params:1,
          id:context['row']['id']
        }
      }
      else
      {
        var data = {
          params:0,
          id:context['row']['id']
        }
      }      
      request({ url: '/' + controller + '/'+ field +'',method: 'post',data: data }).then(ret => {
        if(ret.code !== 200)
        {
          this.$message.error(ret.msg);
        }
      })
    },
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
