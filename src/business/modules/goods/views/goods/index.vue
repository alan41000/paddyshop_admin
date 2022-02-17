<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'goods.goods:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>
          <template  ref="skuData" slot="skuFormSlot">
            <el-card class="">
              <el-form class="el-form" v-if="addItem.add" label-width="100px" size="mini">
              <el-form-item label="规格名称">
                  <el-input placeholder="规格名称" v-model="addItem.name"></el-input>
              </el-form-item>
              <el-form-item label="规格值">
                  <el-input placeholder="规格值" v-model="addItem.item"></el-input>
              </el-form-item>
              <el-form-item class="">
                  <el-button @click="addSpec" type="primary">确认</el-button>
                  <el-button @click="addItem.add = false" type="info">取消</el-button>
              </el-form-item>
              </el-form>
              <div class="">
                <el-button @click="addItem.add = true">添加规格值</el-button>
              </div>
          </el-card>
          <SkuForm
            ref="skuForm"
            :source-attribute="sourceAttribute"
            :attribute.sync="attribute"
            :sku.sync="sku"
            :structure="structure"
            separator="-"
          />
          </template>
        </d2-crud-x>        
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import SkuForm from 'vue-sku-form'
import * as api from './api'
import { request } from '@/api/service'

export default {
  name: 'User',
  mixins: [d2CrudPlus.crud],
  components: {
		SkuForm
	},
  data () {
    return {
      config:[],
      // 添加规格
      addItem: {
        add:false, // 状态
        name: '', // 规格名
        item: '' // 规格值
      },
      sourceAttribute: [
				// {
				// 	name: '颜色',
				// 	item: ['黑', '金', '白']
				// },
				// {
				// 	name: '内存',
				// 	item: ['16G', '32G']
				// }
      ],
      structure: [
        {
          name: 'price',
          type: 'input',
          label: '销售价',
          required: true
        },
        {
          name: 'inventory',
          type: 'input',
          label: '库存',
          required: true
        },
        {
          name: 'code',
          type: 'input',
          label: '货号',
          required: false,
          // batch: false
        },
        {
          name: 'market_price',
          type: 'input',
          label: '市场价'
        }   
        
      ],
			attribute: [
        // {
				// 	name: '颜色',
				// 	item: ['黑', '金']
				// },
				// {
				// 	name: '内存',
				// 	item: ['16G']
				// }
      ],
			sku: [
        // {
				// 	sku: '黑-16G',
				// 	market_price: 100,
				// 	price: 80,
        //   inventory: 100,
        //   code: 'a123',
				// },
				// {
				// 	sku: '金-16G',
				// 	market_price: 100,
				// 	price: 80,
        //   inventory: 100,
        //   code: 'a123',
				// }
      ]
    }
  },
  mounted: function () {
    this.getConfig();
  },
  methods: {
    getConfig(){
      request({
        url: '/setting.Config/getAll',
        method: 'get'
      }).then(ret => {
        this.config = ret.data;
      })
    },
    doCellDataChange(context){
      // 上下架状态更新
      this.enableStatusUpdata(context,'goods.goods','shelves');
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
    // 添加规格
    addSpec(){
      this.sourceAttribute.push({name:this.addItem.name,item:[this.addItem.item]});      
      this.$refs.skuForm.init();
      this.addItem = { add:false, name:'',item:'' };
    },
    doDialogOpened (context) {
      var upLoadConfig = {
        type:'',
        domain:'',
        bucket:'',
        region:'',
        returnType:'',
        custom:{}
      };
      // 图片上传字段处理
      for(var i = 0; i < this.config.length; i++){
        switch(this.config[i].name){
          case 'upload_type':
              if(this.config[i].value == 'aliyunOss'){
                upLoadConfig.type = 'alioss';
                upLoadConfig.region = 'oss-cn-shenzhen';
                upLoadConfig.returnType = 'key';
                upLoadConfig.custom = {
                  fileType: 'goods', //上传时存放的文件目录
                };
                for(var j = 0; j < this.config.length; j++){
                  switch(this.config[j].name){
                    case 'upload_type_aliyunoss_endpoint':
                      upLoadConfig.domain = this.config[j].value;
                      break;

                    case 'upload_type_aliyunoss_bucket':
                      upLoadConfig.bucket = this.config[j].value;
                      break;

                    default:
                  }
                }
              }

              if(this.config[i].value == 'local'){
                upLoadConfig.type = 'form';
                upLoadConfig.action = '/admin/common.upload/save';
              }
              break;
              

          default:
        }
      }
      if(context.mode == 'edit')
      {
        this.sku = context.row.skuValue;
        this.attribute = context.row.skuAttribute;
        this.sourceAttribute = context.row.skuAttribute;
      }
      if(context.mode == 'add')
      {
        this.sku = [];
        this.attribute = [];
        this.sourceAttribute = [];
      }
      context.template.images.component.props.uploader = upLoadConfig;
      context.template.content.component.props.uploader = upLoadConfig;
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    },    
    addRequest (row) {
        row.attribute = this.attribute;
        row.sku = this.sku;
        return api.AddObj(row)

      // this.$refs.skuForm.validate(valid => {
			// 	if (valid) {
      //     row.attribute = this.attribute;
      //     row.sku = this.sku;
      //     return api.AddObj(row)
			// 	} else {
			// 		this.$message.warning('验证失败')
      //     return null;
      //     // Promise.reject('验证失败')
			// 	}
			// })      
    },
    updateRequest (row) {
      row.attribute = this.attribute;
      row.sku = this.sku;
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

<style>
  .page-compact .el-table--border{ border-left:1px solid #EBEEF5}
</style>