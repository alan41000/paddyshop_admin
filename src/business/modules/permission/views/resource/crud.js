import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.menu:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('auth.menu:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('auth.menu:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'primary',
          size: 'small',
          emit: 'add-sub-resource',
          icon: 'el-icon-plus',
          disabled: () => {
            return !vm.hasPermissions('auth.menu:add')
          }
        }
      ],
      width: 180,
      fixed: 'right'
    },
    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: true,
      rowKey: 'id'
    },
    columns: [
      {
        title: '菜单名称',
        key: 'title',
        sortable: true,
        search: {},
        form: {
          rules: [{ required: true, message: '请输入菜单名称' }],
          component: {
            props: {
              placeholder: '菜单名称'
            }
          }
        },
        width: 200
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '图标',
        key: 'icon',
        sortable: false,
        type: 'icon-selector',
        width: 60
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '菜单代码',
        key: 'name',
        sortable: true,
        search: {},
        form: {
          component: {
            placeholder: '路由的name'
          }
        },
        width: 170
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '权限代码',
        key: 'permission',
        sortable: true,
        search: {},
        form: {
          component: {
            placeholder: 'aaa.bbb:ccc'
          }
        },
        width: 170
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由地址',
        key: 'path',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: 'permission/resource'
            }
          }
        },
        width: 180
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由组件',
        key: 'component',
        sortable: true,
        search: {},
        form: {
          component: {
            props: {
              placeholder: ''
            }
          },
          helper: '最顶层的菜单必须配置为layoutHeaderAside。子菜单配置组件路径，例如/permission/views/resource'
        },
        width: 180
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '排序',
        key: 'sort',
        sortable: true
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '菜单类型',
        key: 'type',
        type: 'select',
        align: 'center',
        width: 100,
        search: {},
        dict: {
          data: [
            { value: 1, color: 'info', label:'菜单', name:'MENU' },
            { value: 2, color: 'success', label:'按钮', name:'BTN' },
            { value: 3, color: 'warning', label:'路由', name:'ROUTE' }
          ]
        },
        // search: { disabled: true }, //开启查询
        form: {
          rules: [{ required: true, message: '请选择菜单类型' }]
        },
        // disabled: false //是否隐藏列
        sortable: true
      },
      {
        title: 'id',
        key: 'id',
        // type: 'select',
        // search: { disabled: true }, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, //是否隐藏列
        sortable: true
      },
      {
        title: '父节点',
        key: 'parent_id',
        sortable: true,
        width: 100,
        type: 'tree-selector',
        dict: {
          url: '/auth.menu/tree',
          isTree: true,
          value: 'id',
          label: 'title',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return [{ id: 0, title: '根节点', children: ret.data }]
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
              },
              dict: { cache: false }
            }
          }
        }
      },
      {
        title: '是否启用',
        key: 'is_enable',
        type: 'select',
        align: 'center',
        width: 80,
        search: {},
        dict: {
          data: [
            { value: true, label: '是',color: 'success'  }, { value: false, label: '否',color:'danger'}
          ]
        },
        // search: { disabled: true }, //开启查询
        form: {
          rules: [{ required: true, message: '请选择是否启用' }]
        },
        // disabled: false //是否隐藏列
        sortable: true
      },
    ]
  }
}
