import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id'
    },
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('setting.delivery:list')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('setting.delivery:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('setting.delivery:del')
        }
      },
      width: 180,
      fixed: 'right'
    },
    columns: [
      {
        title: '名称',
        key: 'name',
        sortable: false,
        search: {},
        form: {
          rules: [{ required: true, message: '请输入名称' }]
        },
        width: 300
      },
      {
        title: '图标',
        key: 'icon',
        sortable: false,
        type: 'avatar-uploader',
        component: { props: { height: 40, width: 40 } },
        form: {
          rules: [],
          component: {
            props: {
              uploader: {
                type: 'form',
                data:{path:'images/site'},
                action: '/admin/common.upload/save',
                successHandle(res){
                  return {url:res.data.url}
                }
              }
            },
            span: 24
          },
        },
      },
      {
        title: '启用',
        key: 'is_enable',
        sortable: true,
        type: 'select',
        dict: {
            data: [
                { value: true, label: '是',color: 'success'  }, { value: false, label: '否',color:'danger'}
            ]
          },
        search: {},
        form: {},
        width: 300
      },
      {
        title: '排序',
        key: 'sort',
        type: 'number',
        search: { disabled: true },
        width: 300,
        sortable: true
      },
    {
        title: '添加时间',
        key: 'create_time',
        form: {disabled: true, }, 
        disabled: true, 
        sortable: false
      },
      {
        title: '更新时间',
        key: 'update_time',
        form: {disabled: true, }, 
        disabled: true, 
        sortable: false
      },
    ]
  }
}
