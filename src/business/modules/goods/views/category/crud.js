import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    pagination:{
        pageSize:100
    },
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('goods.category:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('goods.category:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('goods.category:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'primary',
          size: 'small',
          emit: 'add-sub-category',
          icon: 'el-icon-plus',
          disabled: () => {
            return !vm.hasPermissions('goods.category:add')
          }
        }
      ],
      width: 180,
      fixed: 'right'
    },
    options: {
      height: '100%', 
      highlightCurrentRow: true,
      rowKey: 'id'
    },
    columns: [
      {
        title: '分类名称',
        key: 'name',
        sortable: true,
        search: {},
        form: {
          rules: [{ required: true, message: '请输入分类名称' }],
          component: {
            props: {
              placeholder: '分类名称'
            }
          }
        },
      },
      {
        title: '图标',
        key: 'icon',
        sortable: false,
        type:'avatar-uploader',
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
        title: '副标题',
        key: 'vice_name',
        sortable: false,
      },
      {
        title: '描述',
        key: 'describe',
        sortable: false,
      },
      {
        title: '首页推荐',
        type:'radio',
        key: 'is_home_recommended',
        sortable: true,
        form:{
          disabled:false,
        },
        dict:{
          data:[
            {value:true, label:'是', color:'success'},
            {value:false, label:'否'},            
          ]
        }
      },
      {
        title: '启用',
        type:'radio',
        key: 'is_enable',
        sortable: true,
        form:{
          disabled:false,
        },
        dict:{
          data:[
            {value:true, label:'是', color:'success'},
            {value:false, label:'否'},            
          ]
        }
      },
      {
        title: '排序',
        key: 'sort',
        sortable: true
      },
      {
        title: '父节点',
        key: 'parent_id',
        sortable: true,
        type: 'tree-selector',
        dict: {
          url: '/goods.category/tree',
          isTree: true,
          value: 'id',
          label: 'name',
          getData: (url, dict) => {
            return request({ url: url }).then(ret => {
              return [{ id: 0, name: '根节点', children: ret.data }]
            })
          }
        },
        form: {
          rules: [{ required: true, message: '请选择父节点' }],
          component: {
            props: {
              multiple: false,
              elProps: {
                defaultExpandAll: true
              }
            }
          }
        }
      },
    ]
  }
}
