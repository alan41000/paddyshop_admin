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
          return !vm.hasPermissions('store.article:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('store.article:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('store.article:del')
        }
      },
      width: 180,
      fixed: 'right'
    },
    columns: [
      {
        title: '标题',
        key: 'title',
        sortable: false,
        search: {},
        form: {
          rules: [{ required: true, message: '请输入标题' }]
        },
      },
      {
        title: '跳转链接',
        key: 'url',
        sortable: false,
        search: {
          disabled:true
        },
        form: {},
        show:false,
      },
      {
        title: '关键词',
        key: 'keywords',
        sortable: false,
        search: {
          disabled:true
        },
        form: {},
        show:false,
      },
      {
        title: '描述',
        key: 'description',
        sortable: false,
        search: {
          disabled:true
        },
        form: {},
        show:false,
      },
      {
        title: '封面',
        key: 'images',
        type:'image-uploader',
        component: { props: { height: 80, width: 80 } },
        // width: 95,
        search: { disabled: true },
        form: {
            component: {
              props: {
                elProps:{limit:1},
                uploader: {
                  type: 'form',
                  action: '/admin/common.upload/save',
                  successHandle(res){
                    return {url:res.data.url}
                    }
                }
              },
              span: 24
            },
        },
        show:false,
        sortable: false
      },
      {
        title: '分类',
        key: 'category_id',
        sortable: true,
        width: 300,
        type: 'tree-selector',
        dict: {
          url: '/store.articleCategory/tree',
          isTree: true,
          value: 'id',
          label: 'name',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => {
              return ret.data
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
      {
        title: '浏览量',
        key: 'views_count',
        sortable: true,
        search: {
          disabled:true
        },
        form: {
          disabled:true
        },
        show:true,
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
      },
      // {
      //   title: '排序',
      //   key: 'sort',
      //   type: 'number',
      //   search: { disabled: true },
      //   sortable: true
      // },
      {
        title: '内容',
        key: 'content',
        type:'editor-quill',
        sortable: false,
        search: {disabled:true},
        form: {
            component: {
              props: {
                uploader: {
                  type: 'form', // 上传后端类型【cos,aliyun,oss,form】
                  action: '/admin/common.upload/save',
                  successHandle(res){
                    return {url:res.data.url}
                    }
                }
              },
              events: {
                'text-change': (event) => {
                  // console.log('text-change:', event)
                }
              },
              show: true
            }
          },
        show:false
      }, 
      {
        title: '添加时间',
        key: 'create_time',
        form: {disabled: true, }, 
        // disabled: true, 
        sortable: false,
        show:true,
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
