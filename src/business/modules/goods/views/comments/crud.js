import { request } from '@/api/service'
import goodsComments from '@/business/modules/goods/components/goodsComments/goodsComments'

export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id'
    },
    components: {
      goodsComments,
    },
    rowHandle: {
      width: 80,
      view: {
        thin: true,
        text: null,
        show: false,
      },
      edit: {
        thin: true,
        text: '回复',
        disabled () {
          return !vm.hasPermissions('goods.comments:edit')
        },
        show: true,
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('goods.comments:del')
        },
        show: false,
      },
      custom: [
        // {
        //   thin: true,
        //   text: null,
        //   type: 'warning',
        //   size: 'small',
        //   emit: 'authz',
        //   icon: 'el-icon-s-flag',
        //   disabled () {
        //     return !vm.hasPermissions('usersphere:user:authz')
        //   }
        // }
      ]
    },
    columns: [
      {
        title: '商品',
        key: 'goodsInfo',
        sortable: true,
        search: {disabled:true},
        width: 250,
        component: {
          name: goodsComments,
        },
        form: {
            disabled:true
        },
      },
      {
        title: '会员',
        key: 'user_id',
        type: 'select',
        width: 80,
        dict: {
            url: '/user.user/getAll', 
            value: 'id',
            label: 'nickname',
            getData: (url, dict) => {
              return request({ url: url, method: 'post'}).then(ret => {                
                return ret.data
             })
          },
        },
        sortable: false,
        search: {disabled:true},
        form: {
            disabled:true,
        },
        show:true
      },
      {
        title: '评价内容',
        key: 'content',
        sortable: false,
        search: { disabled:true},
        width: 150,
        form: {
            disabled:false,
            component:{
              name:'el-input',
              props:{
                type:'textarea'
              },
              span:24,
            }
        },
      },
      {
        title: '回复内容',
        key: 'reply',
        sortable: false,
        search: { disabled:true},
        width: 150,
        form: {
            disabled:false,
            component:{
              name:'el-input',
              props:{
                type:'textarea'
              },
              span:24,
            }
        },
      },
      {
        title: '晒图',
        key: 'images',
        type:'image-uploader',
        component: { props: { height: 40, width: 40 } },
        width: 95,
        search: { disabled: true },
        form: {
          disabled:true
        },
        show:true,
        sortable: false
      },
      {
        title: '评分',
        key: 'rating',
        component: {
          name: 'el-rate',
          props:{
            disabled:true
          }
        },
        sortable: false,
        search: { disabled:true},
        width: 100,
        form: {
            disabled:true
        },
      },
      {
        title: '匿名',
        key: 'is_anonymous',
        type: 'select',
        dict: {
          data: [
              { value: false, label: '否' }, { value: true, label: '是' },
          ]
        },
        sortable: false,
        search: { disabled:true},
        width: 40,
        form: {
            disabled:true
        },
      },
      {
        title: '显示',
        key: 'is_show',
        type: 'switch',
        width: 40,
        search: {
          disabled: true,
        },
        form: { // 表单配置
          component: {
            show (context) {
              return true
            }
          }
        },
        sortable: false
      },
      {
        title: '添加时间',
        key: 'create_time',
        sortable: false,
        width: 100,
        form: {
            disabled:true
        },
      },
    ]
  }
}
