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
          return !vm.hasPermissions('store.articlecategory:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('store.articlecategory:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('store.articlecategory:del')
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
            return !vm.hasPermissions('store.articlecategory:add')
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
          url: '/store.ArticleCategory/tree',
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
