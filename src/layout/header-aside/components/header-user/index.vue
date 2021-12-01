<!--
 * @Author: Alan Leung
 * @Date: 2021-08-11 10:22:46
 * @LastEditors: Alan Leung
 * @LastEditTime: 2021-10-19 09:28:18
 * @Description: 
-->
<template>
  <div>
    <el-dropdown size="small" class="d2-mr">
      <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
      <el-dropdown-menu slot="dropdown">      
        <el-dropdown-item @click.native="clearCache">
          <i class="el-icon-refresh"></i>
          清除缓存
        </el-dropdown-item>
        <el-dropdown-item @click.native="editPswShow = true">
          <i class="el-icon-s-operation"></i>
          修改密码
        </el-dropdown-item>
        <el-dropdown-item @click.native="logOff">
          <i class="el-icon-circle-close"></i>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="修改密码"
      :visible.sync="editPswShow"
      width="500px"
      >
      <el-form :model="pswForm" :rules="rules" ref="pswForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="pswForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pswForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="pswForm.confirmPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('pswForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditPasssword('pswForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { request } from '@/api/service'
export default {
  data () {
    return {
      editPswShow:false,
      pswForm:{
        password:'',
        newPassword:'',
        confirmPassword:'',
      },
      rules:{
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    /**
     * @description 清除缓存
     */
    clearCache () {      
      request({ url: '/setting.System/clearCache',method: 'post',data: [] }).then(ret => {
        if(ret.code == 200){
          this.$message({
            message: '清除成功！',
            type: 'success'
          });
        }
        else{
          this.$message.error(ret.msg);
        }
      })
    },
    submitEditPasssword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request({ url: '/auth.Admin/editPassword',method: 'post',data: this.pswForm }).then(ret => {
              if(ret.code == 200){
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.resetForm('pswForm');
              }
              else{
                this.$message.error(ret.msg);
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.editPswShow = false;
        this.$refs[formName].resetFields();
      }
  },
}
</script>
