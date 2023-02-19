<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">

        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @audit="audit"
                @refuse="refuse"
                @confirm="confirm"
        >
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>
        </d2-crud-x>
        <el-dialog title="审核操作" width="30%" :visible.sync="dialogAudit">
          <el-row>
              <el-col :span="6">退款方式：</el-col>
              <el-col :span="18">
                  <el-radio v-model="refundment" label="1">原路退回</el-radio>
                  <el-radio v-model="refundment" label="2">退至钱包</el-radio>
                  <el-radio v-model="refundment" label="3">手动处理</el-radio>
              </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="auditSubmit()">确 定</el-button>
              <el-button @click="init()">关 闭</el-button>
          </div>
        </el-dialog>

        <el-dialog title="拒绝操作" width="30%" :visible.sync="dialogRefuse">
          <el-row>
              <el-col :span="4">拒绝原因：</el-col>
              <el-col :span="20">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入拒绝原因"
                    v-model="refuseReason">
                  </el-input>
              </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="refuseSubmit()">确 定</el-button>
              <el-button @click="init()">关 闭</el-button>
          </div>
        </el-dialog>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
import { request } from '@/api/service'

export default {
  name: 'aftersale',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
        handleOrderId:0,
        dialogAudit: false,
        dialogRefuse:false,
        refundment:0,
        dialogFormVisible: false,
        dialogFormOrderId:0,
        dialogFormUserId:0,
        formLabelWidth: '80px',
        refuseReason:'',
    }
  },
  created(){

  },
  methods: {
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
    audit(e){
        this.dialogAudit = true;
        this.handleOrderId = e.row.id;
    },
    auditSubmit(){
        var data = {
            id:this.handleOrderId,
            refundment:this.refundment,
        };
        api.Audit(data).then(res=>{
            if(res.code == 200)
            {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.init();
                this.doRefresh();
            }
        });
    },
    refuse(e){
        this.dialogRefuse = true;
        this.handleOrderId = e.row.id;
    },
    refuseSubmit(){
        var data = {
            id:this.handleOrderId,
            refuse_reason:this.refuseReason
        };
        api.Refuse(data).then(res=>{
            if(res.code == 200)
            {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.init();
                this.doRefresh();
            }
        });
    },
    confirm(e) {
        this.$confirm('操作后不可恢复、确认继续吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id:e.row.id,
          };
          api.Confirm(data).then(res=>{
              if(res.code == 200)
              {
                  this.$message({
                      type: 'success',
                      message: '操作成功!'
                  });
                  this.doRefresh();
              }
          });
        }).catch(() => {});
    },
    init(){
      this.handleOrderId = 0;
      this.dialogAudit = false;
      this.dialogRefuse = false;
      this.refundment = 0;
      this.dialogFormVisible = false;
      this.dialogFormOrderId = 0;
      this.dialogFormUserId = 0;
      this.refuseReason = '';
    }
  }
}
</script>
<style>
.pd20{
    padding: 20px;
}
.mt20{
    margin-top: 20px;
}
.fl{
    float:left;
}
.title{
    font-size: 16px;
    margin-left: 10px;
    width: 80%;
}
</style>
