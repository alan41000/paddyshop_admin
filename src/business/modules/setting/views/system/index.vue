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
                        <div style="width:600px"><el-divider></el-divider></div>
                        <el-form-item label="热门搜索" prop="common_website_hotsearch">
                            <el-input class="input" v-model="baseWebsiteForm.common_website_hotsearch" placeholder="热门搜索关键词，以空格分开"></el-input>
                        </el-form-item>
                        <el-form-item label="库存扣减规则" prop="common_goods_inventory_rules">
                            <el-select v-model="baseWebsiteForm.common_goods_inventory_rules" placeholder="请选择">
                                <el-option
                                v-for="item in goodsInventoryRules"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="积分抵现" prop="common_website_integral_deduction">
                            <el-input class="input" label="" v-model="baseWebsiteForm.common_website_integral_deduction" placeholder="积分抵现比例，单位：元">                                
                            </el-input>
                            <span class="tips">如1积分=10元输入10,1积分=0.1元输入0.1，1积分=1元输入1,不启用积分抵现留空或输入0</span>
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
                <el-tab-pane label="微信公众号H5" name="weixinH5">                    
                    <el-form :model="weixinH5Form" :rules="WeixinH5Rules" ref="weixinH5Form" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="AppId" prop="app_weixinh5_appid">
                            <el-input class="input" v-model="weixinH5Form.app_weixinh5_appid" placeholder="请输入微信公众号AppId"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret" prop="app_weixinh5_appsecret">
                            <el-input class="input" v-model="weixinH5Form.app_weixinh5_appsecret" placeholder="请输入微信公众号AppSecret"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('weixinH5Form')">确定</el-button>
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
        <el-tab-pane label="文件上传配置" name="upload">
            <el-tabs v-model="uploadTab" type="card">
                <el-tab-pane label="基础配置" name="uploadBase">
                    <el-form :model="uploadTypeForm" :rules="uploadTypeRules" ref="uploadTypeForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="上传类型" prop="uploadType">
                            <el-radio v-model="uploadTypeForm.upload_type" label="local">本地存储</el-radio>
                            <el-radio v-model="uploadTypeForm.upload_type" label="aliyunOss">阿里云OSS</el-radio>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('uploadTypeForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="阿里云配置" name="aliyunOss">
                    <el-form :model="aliyunOssForm" :rules="aliyunOssRules" ref="aliyunOssForm" label-width="150px" class="demo-ruleForm">
                        <el-form-item label="Bucket" prop="upload_type_aliyunoss_bucket">
                            <el-input class="input" v-model="aliyunOssForm.upload_type_aliyunoss_bucket" placeholder="请输入Bucket"></el-input>
                        </el-form-item>
                        <el-form-item label="Endpoint" prop="upload_type_aliyunoss_endpoint">
                            <el-input class="input" v-model="aliyunOssForm.upload_type_aliyunoss_endpoint" placeholder="请输入Endpoint,以https开头，/结尾"></el-input>
                        </el-form-item>
                        <el-form-item label="Region" prop="upload_type_aliyunoss_region">
                            <el-input class="input" v-model="aliyunOssForm.upload_type_aliyunoss_region" placeholder="请输入Region,如oss-cn-shenzhen"></el-input>
                        </el-form-item>
                        <el-form-item label="AccessKeyId" prop="upload_type_aliyunoss_accessKeyId">
                            <el-input class="input" v-model="aliyunOssForm.upload_type_aliyunoss_accessKeyId" placeholder="请输入AccessKeyId"></el-input>
                        </el-form-item>
                        <el-form-item label="AccessKeySecret" prop="upload_type_aliyunoss_accessKeySecret">
                            <el-input class="input" v-model="aliyunOssForm.upload_type_aliyunoss_accessKeySecret" placeholder="请输入AccessKeySecret"></el-input>
                        </el-form-item>
                        <el-form-item label="RoleArn" prop="upload_type_aliyunoss_roleArn">
                            <el-input class="input" v-model="aliyunOssForm.upload_type_aliyunoss_roleArn" placeholder="请输入RoleArn"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('aliyunOssForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
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
        uploadTab:'uploadBase',
        uploadTypeForm:{
            upload_type:'local'
        },
        uploadTypeRules:{
            upload_type:'',
        },
        aliyunOssForm:{
            upload_type_aliyunoss_bucket:'',
            upload_type_aliyunoss_endpoint:'',
            upload_type_aliyunoss_region:'',
            upload_type_aliyunoss_accessKeyId:'',
            upload_type_aliyunoss_accessKeySecret:'',
            upload_type_aliyunoss_roleArn:'',
        },
        aliyunOssRules:{
            upload_type_aliyunoss_endpoint:[
                {pattern:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+\/$/,message:'Endpoint以https开头，/结尾'}
            ]
        },
        baseWebsiteForm:{
            common_website_name:'',
            common_website_enable:'0',
            common_website_url:'',
            common_website_logo:'',
            common_website_icon:'',
            common_goods_inventory_rules:'',
            common_website_integral_deduction:'',
        },
        baseWebsiteRules:{
            common_website_url:[
                {pattern:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+\/$/,message:'网站地址以https或http开头，/结尾'}
            ]
        },
        goodsInventoryRules: [
            {value: '1',label: '下单减库存'}, 
            {value: '2',label: '付款减库存'}, 
            {value: '3',label: '确认收货减库存'}
        ],
        weixinH5Form:{
            app_weixinh5_appid:'',
            app_weixinh5_appsecret:'',
        },
        weixinH5Rules:{
            app_weixinH5_appid:[],
            app_weixinH5_appsecret:[],
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
                                this.websiteIcon = ret.data[i].value;
                                break;

                            case 'common_website_logo':
                                this.baseWebsiteForm.common_website_logo = ret.data[i].value;
                                this.websiteLogo = ret.data[i].value;
                                break;
                            
                            case 'common_goods_inventory_rules':
                                this.baseWebsiteForm.common_goods_inventory_rules = ret.data[i].value;
                                break;

                            case 'common_website_hotsearch':
                                this.baseWebsiteForm.common_website_hotsearch = ret.data[i].value;
                                break;

                            case 'common_website_integral_deduction':
                                this.baseWebsiteForm.common_website_integral_deduction = ret.data[i].value;
                                break;

                            case 'app_weixinminiapp_appid':
                                this.appWeixinMiniAppForm.app_weixinminiapp_appid = ret.data[i].value;
                                break;

                            case 'app_weixinminiapp_appsecret':
                                this.appWeixinMiniAppForm.app_weixinminiapp_appsecret = ret.data[i].value;
                                break;

                            case 'app_weixinh5_appid':
                                this.weixinH5Form.app_weixinh5_appid = ret.data[i].value;
                                break;

                            case 'app_weixinh5_appsecret':
                                this.weixinH5Form.app_weixinh5_appsecret = ret.data[i].value;
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

                            case 'upload_type':
                                this.uploadTypeForm.upload_type = ret.data[i].value;
                                break;

                            case 'upload_type_aliyunoss_bucket':
                                this.aliyunOssForm.upload_type_aliyunoss_bucket = ret.data[i].value;
                                break;
                            
                            case 'upload_type_aliyunoss_endpoint':
                                this.aliyunOssForm.upload_type_aliyunoss_endpoint = ret.data[i].value;
                                break;

                            case 'upload_type_aliyunoss_region':
                                this.aliyunOssForm.upload_type_aliyunoss_region = ret.data[i].value;
                                break;

                            case 'upload_type_aliyunoss_accessKeyId':
                                this.aliyunOssForm.upload_type_aliyunoss_accessKeyId = ret.data[i].value;
                                break;

                            case 'upload_type_aliyunoss_accessKeySecret':
                                this.aliyunOssForm.upload_type_aliyunoss_accessKeySecret = ret.data[i].value;
                                break;

                            case 'upload_type_aliyunoss_roleArn':
                                this.aliyunOssForm.upload_type_aliyunoss_roleArn = ret.data[i].value;
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
    .tips{
        float: left;
        width: 100%;
        color: #8c939d;
        margin-top: 5px;
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
