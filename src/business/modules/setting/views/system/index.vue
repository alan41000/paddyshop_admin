<template >
  <d2-container class="page">
    <el-tabs v-model="totalTab">
        <el-tab-pane label="基础配置" name="base">
            <el-tabs v-model="baseTab" type="card">
                <el-tab-pane label="站点配置" name="baseWebsite">
                    <el-form :model="baseWebsiteForm" :rules="baseWebsiteRules" ref="baseWebsiteForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="站点开启" prop="common_website_enable">
                            <el-radio v-model="baseWebsiteForm.common_website_enable" label="1">开启</el-radio>
                            <el-radio v-model="baseWebsiteForm.common_website_enable" label="0">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="网站名称" prop="common_website_name">
                            <el-input class="input" v-model="baseWebsiteForm.common_website_name" placeholder="请输入网站名称"></el-input>
                        </el-form-item>
                        <el-form-item label="网站地址" prop="common_website_url">
                            <el-input class="input" v-model="baseWebsiteForm.common_website_url" placeholder="请输入网站地址,以https或http开头，/结尾"></el-input>
                        </el-form-item>
                        <el-form-item label="网站Logo" prop="common_website_logo">
                            <el-upload
                                class="avatar-uploader"
                                accept=".jpg,.jpeg,.png,.gif"
                                :headers="header"
                                :action="uploadAciton"
                                :show-file-list="false"
                                :on-success="handleLogoSuccess"
                                :before-upload="beforeAvatarUpload"
                                :data="{path:'images/logo'}">
                                <img v-if="websiteLogo" :src="websiteLogo" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="网站图标" prop="common_website_icon">
                            <el-upload
                                class="avatar-uploader"
                                accept=".jpg,.jpeg,.png,.gif"
                                :headers="header"
                                :action="uploadAciton"
                                :show-file-list="false"
                                :on-success="handleIconSuccess"
                                :before-upload="beforeAvatarUpload"
                                :data="{path:'images/logo'}">
                                <img v-if="websiteIcon" :src="websiteIcon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('baseWebsiteForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <!-- <el-tab-pane label="商城配置" name="mall">
            <el-tabs v-model="mallTab" type="card">
                <el-tab-pane label="基础配置" name="mallBase">基础配置</el-tab-pane>
            </el-tabs>
        </el-tab-pane> -->
        <el-tab-pane label="应用配置" name="app">
            <el-tabs v-model="appTab" type="card">
                <!-- <el-tab-pane label="微信公众号H5" name="appH5">                    
                    <el-form :model="appH5Form" :rules="appH5Rules" ref="appH5Form" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="AppId" prop="appid">
                            <el-input class="input" v-model="appH5Form.app_weixinh5_appid" placeholder="请输入微信公众号AppId"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret" prop="appid">
                            <el-input class="input" v-model="appH5Form.app_weixinh5_appsecret" placeholder="请输入微信公众号AppSecret"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('appH5Form')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane> -->
                <el-tab-pane label="微信小程序" name="appWeixinMiniApp">
                    <el-form :model="appWeixinMiniAppForm" :rules="appWeixinMiniAppRules" ref="appWeixinMiniAppForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="AppId" prop="app_appWeixinMiniApp_appid">
                            <el-input class="input" v-model="appWeixinMiniAppForm.app_weixinminiapp_appid" placeholder="请输入微信小程序AppId"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret" prop="app_appWeixinMiniApp_appsecret">
                            <el-input class="input" v-model="appWeixinMiniAppForm.app_weixinminiapp_appsecret" placeholder="请输入微信小程序AppSecret"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('appWeixinMiniAppForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="支付配置" name="payment">
            <el-tabs v-model="paymentTab" type="card">
                <el-tab-pane label="钱包" name="paymenWallet">
                    <el-form :model="paymenWalletForm" :rules="paymenWalletRules" ref="paymenWalletForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="开启" prop="payment_wallet_enable">
                            <el-radio v-model="paymenWalletForm.payment_wallet_enable" label="1">开启</el-radio>
                            <el-radio v-model="paymenWalletForm.payment_wallet_enable" label="0">关闭</el-radio>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('paymenWalletForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="微信支付" name="paymenWeixin">
                    <el-form :model="paymenWeixinForm" :rules="paymenWeixinRules" ref="paymenWeixinForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="开启" prop="payment_weixin_enable">
                            <el-radio v-model="paymenWeixinForm.payment_weixin_enable" label="1">开启</el-radio>
                            <el-radio v-model="paymenWeixinForm.payment_weixin_enable" label="0">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="Mchid" prop="payment_weixin_mchid">
                            <el-input class="input" v-model="paymenWeixinForm.payment_weixin_mchid" placeholder="请输入微信支付Mchid"></el-input>
                        </el-form-item>
                        <el-form-item label="Key" prop="payment_weixin_key">
                            <el-input class="input" v-model="paymenWeixinForm.payment_weixin_key" placeholder="请输入微信支付Key"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('paymenWeixinForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="支付宝" name="paymenAlipay">
                    <el-form :model="paymenAlipayForm" :rules="paymenAlipayRules" ref="paymenAlipayForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="开启" prop="payment_alipay_enable">
                            <el-radio v-model="paymenAlipayForm.payment_alipay_enable" label="1">开启</el-radio>
                            <el-radio v-model="paymenAlipayForm.payment_alipay_enable" label="0">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="应用Appid" prop="Appid">
                            <el-input class="input" v-model="paymenAlipayForm.payment_alipay_appid" placeholder="请输入支付宝应用Appid"></el-input>
                        </el-form-item>
                        <el-form-item label="支付私钥" prop="privateKey">
                            <el-input class="input" v-model="paymenAlipayForm.payment_alipay_privateKey" placeholder="请输入支付私钥"></el-input>
                        </el-form-item>
                        <el-form-item label="支付公钥" prop="publicKey">
                            <el-input class="input" v-model="paymenAlipayForm.payment_alipay_publicKey" placeholder="请输入支付公钥"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('paymenAlipayForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane> -->
            </el-tabs>
        </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
import { request } from '@/api/service'
import util from '@/libs/util'
export default {
  name: 'setting',
  components: {
  },
  data () {
    return {
        header:'',
        uploadAciton:'/admin/common.upload/save',
        websiteLogo:'',
        websiteIcon:'',
        totalTab:'base',
        baseTab: 'baseWebsite',
        mallTab:'mallBase',
        appTab:'appWeixinMiniApp',
        paymentTab:'paymenWallet',
        baseWebsiteForm:{
            common_website_name:'',
            common_website_enable:'0',
            common_website_url:'',
            common_website_logo:'',
            common_website_icon:'',
        },
        baseWebsiteRules:{
            common_website_url:[
                {pattern:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+\/$/,message:'网站地址以https或http开头，/结尾'}
            ]
        },
        appH5Form:{
            app_weixinh5_appid:'',
            app_weixinh5_appsecret:'',
        },
        appH5Rules:{
            app_appH5_appid:[],
            app_appH5_appsecret:[],
        },
        appWeixinMiniAppForm:{
            app_weixinminiapp_appid:'',
            app_weixinminiapp_appsecret:'',
        },
        appWeixinMiniAppRules:{
            app_weixinminiapp_appid:[],
            app_weixinminiapp_appsecret:[],
        },
        paymenWalletForm:{
            payment_wallet_enable:'0'
        },
        paymenWalletRules:{
            payment_wallet_enable:[],
        },
        paymenWeixinForm:{
            payment_weixin_enable:'0',
            payment_weixin_mchid:'',
            payment_weixin_key:''
        },
        paymenWeixinRules:{
            payment_weixin_enable:[],
            payment_weixin_mchid:[],
            payment_weixin_key:[]
        },
        paymenAlipayForm:{
            payment_alipay_enable:'0',
            payment_alipay_appid:'',
            payment_alipay_privateKey:'',
            payment_alipay_publicKey:''
        },
        paymenAlipayRules:{
            payment_alipay_enable:[],
            payment_alipay_appid:[],
            payment_alipay_privateKey:[],
            payment_alipay_publicKey:[]
        },
    }
  },
  created () {
      this.dataInit();
      this.header = {
        Token: util.cookies.get('token'),
      };
  },
  methods: {
      dataInit(){
            request({ url: '/setting.Config/getAll',method: 'post' }).then(ret => {
                if(ret.code == 200){
                    for(var i=0; i< ret.data.length; i++){
                        switch(ret.data[i].name){
                            case 'common_website_name':
                                this.baseWebsiteForm.common_website_name = ret.data[i].value;
                                break;

                            case 'common_website_enable':
                                this.baseWebsiteForm.common_website_enable = ret.data[i].value;
                                break;

                            case 'common_website_url':
                                this.baseWebsiteForm.common_website_url = ret.data[i].value;                                
                                break;

                            case 'common_website_icon':
                                this.baseWebsiteForm.common_website_icon = ret.data[i].value;
                                this.websiteIcon = '/' + ret.data[i].value;
                                break;

                            case 'common_website_logo':
                                this.baseWebsiteForm.common_website_logo = ret.data[i].value;
                                this.websiteLogo = '/' + ret.data[i].value;
                                break;

                            case 'app_weixinminiapp_appid':
                                this.appWeixinMiniAppForm.app_weixinminiapp_appid = ret.data[i].value;
                                break;

                            case 'app_weixinminiapp_appsecret':
                                this.appWeixinMiniAppForm.app_weixinminiapp_appsecret = ret.data[i].value;
                                break;
                            
                            case 'payment_wallet_enable':
                                this.paymenWalletForm.payment_wallet_enable = ret.data[i].value;
                                break;

                            case 'payment_weixin_enable':
                                this.paymenWeixinForm.payment_weixin_enable = ret.data[i].value;
                                break;
                            
                            case 'payment_weixin_mchid':
                                this.paymenWeixinForm.payment_weixin_mchid = ret.data[i].value;
                                break;

                            case 'payment_weixin_key':
                                this.paymenWeixinForm.payment_weixin_key = ret.data[i].value;
                                break;

                            default:
                        }
                    }
                }else{
                    this.$message.error(ret.msg);
                }
            })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.$refs[formName].model;
            request({ url: '/setting.Config/save',method: 'post',data: data }).then(ret => {
                if(ret.code == 200){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error(ret.msg);
                }
            })
          } else {
            return false;
          }
        });
      },
      handleLogoSuccess(res, file) {
        if(res.code == 200){
            this.baseWebsiteForm.common_website_logo = res.data.value;
            this.websiteLogo = URL.createObjectURL(file.raw);
        }else{
            this.$message.error = res.msg;
        }
      },
      handleIconSuccess(res, file) {
        if(res.code == 200){
            this.baseWebsiteForm.common_website_icon = res.data.value;
            this.websiteIcon = URL.createObjectURL(file.raw);
        }else{
            this.$message.error = res.msg;
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG && !isGIF) {
          this.$message.error('上传图片只能是 JPG,PNG,GIF 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG || isGIF) && isLt2M;
      }
  }
}
</script>

<style lang="scss" scoped>
    .input{
        width: 500px;
    }
    .avatar-uploader {
        width: 100px;
        height: 100px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>
