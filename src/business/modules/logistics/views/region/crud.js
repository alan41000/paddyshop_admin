import { request } from '@/api/service'
import treeSelect from '@/business/modules/logistics/components/treeSelect/treeSelect'

export const crudOptions = function (vm) {
  return {
    rowHandle: {
      view: {
        thin: false,
        text: '查看',
        disabled () {
          return !vm.hasPermissions('setting.region:view')
        }
      },
      edit: {
        thin: false,
        text: '编辑',
        disabled: () => {
          return !vm.hasPermissions('setting.region:edit')
        }
      },
      remove: {
        thin: false,
        text: '删除',
        disabled: () => {
          return !vm.hasPermissions('setting.region:del')
        }
      },
      custom: [
        // {
        //   thin: true,
        //   text: null,
        //   type: 'primary',
        //   size: 'small',
        //   emit: 'add-sub-region',
        //   icon: 'el-icon-plus',
        //   disabled: () => {
        //     return !vm.hasPermissions('logistics.region:add')
        //   }
        // }
      ],
      width: 300,
      fixed: 'right'
    },
    pageOptions: {
      compact: true
    },
    options: {
      events: {
        /**
         *  默认没有支持的事件需要在此配置
         https://element.eleme.cn/#/zh-CN/component/table#table-events

         * 默认已经支持的事件
         @select
         @sort-change
         @cell-mouse-enter
         @cell-mouse-leave
         @cell-click
         @cell-dblclick
         @row-click
         @row-contextmenu
         @row-dblclick
         @header-click
         @header-contextmenu
         @current-change
         'select-all'
         'selection-change'
         */
        'expand-change': (row, arg2) => {
          // console.log('expand-changed:', row, arg2)
        }
      },
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      rowKey: 'id',
      lazy: true,
      load: (tree, treeNode, resolve) => {
        request({
          url: '/setting.region/list',
          method: 'post',
          data: { parent_id: tree.id }
        }).then(ret => {
          vm._doRowValueBuilder(ret.data.records)
          resolve(ret.data.records)
        })
      },
    },
    components: {
      treeSelect
    },
    columns: [
      {
        title: '地区',
        key: 'name',
        width: 700,
        form: {
          disabled: false,
          rules: [{ required: true, message: '请填写地区名称' }],
        }
      },

      {
        title:'上级地区',
        key: 'parent_id',
        width: 200,
        show: false,        
        form: {
          disabled: false,
          component: {
            name: treeSelect,
          },
        }
      },
      
      {
        title: '排序',
        key: 'sort',
        width: 300,
        sortable: true,
        form: {
          disabled: false,
          rules: [{ type: 'number', message: '排序必须为数字值'}],
          component:{
            value:0
          }
        }
      },

      {
        title: '是否启用',
        key: 'is_enable',
        type: 'select',
        width: 300,
        search: { disabled: true }, // 开启查询
        dict: {
            data: [
                { value: true, label: '是',color: 'success'  }, { value: false, label: '否',color:'danger'}
            ]
        }, 
        sortable: false,
        form: {
          disabled: false,
          component:{
            value:true
          }
        }
      }
    ]
  }
}
