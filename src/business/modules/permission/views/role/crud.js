export const crudOptions = (vm) => {
  return {
    options: {
      defaultSort: {
        prop: 'id',
        order: 'descending'
      },
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.role:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.role:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.role:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
          type: 'warning',
          size: 'small',
          emit: 'authz',
          icon: 'el-icon-s-flag',
          disabled () {
            return !vm.hasPermissions('auth.role:authz')
          }
        }
      ]
    },
    columns: [
      {
        title: '创建时间',
        key: 'createTime',
        sortable: 'create_time',
        type: 'datetime',
        form: { disabled: true },
        show:false,
      },
      {
        title: '更新时间',
        key: 'updateTime',
        sortable: 'update_time',
        type: 'datetime',
        form: { disabled: true },
        show:false,
      },
      {
        title: '角色名称',
        key: 'name',
        sortable: 'name'
      },
      {
        title: '角色代码',
        key: 'code',
        search: { disabled: false },
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          }
        },
      },
      {
        title: '状态',
        key: 'is_enable',
        type: 'select',
        dict: {
          data: [
            { value: true, label: '启用' }, { value: false, label: '禁用', color: 'danger' }
          ]
        }, 
        search: { disabled: false },
        form: {
        }, 
      }

    ]
  }
}
