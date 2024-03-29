<!--
 * @Author: Alan Leung
 * @Description: 视频上传组件
-->
<template>
  <div class="d2p-file-uploader" :class="{'is-disabled':disabled}" >
  <el-upload :class="uploadClass"
             :file-list="fileList"
             :disabled="disabled"
             :http-request="httpRequest"
             :on-exceed="onExceed"
             :on-remove="handleUploadFileRemove"
             :on-success="handleUploadFileSuccess"
             :on-error="handleUploadFileError"
             :on-progress="handleUploadProgress"
             :before-upload="beforeUpload"
             @blur="handleBlur"
             ref="fileUploader"
             v-bind="_elProps"
  >
    <el-button :disabled="disabled" :size="btnSize" type="primary" v-if="_elProps.listType === 'text' || this._elProps.listType === 'picture'">{{btnName}}</el-button>
    <div class="avatar-item-wrapper"  v-else-if="this._elProps.listType === 'picture-card'">
      <i class="el-icon-plus avatar-uploader-icon" />
    </div>
    <div slot="file" slot-scope="{file}">
      <el-progress type="circle" v-if="file.percentage > 0 && file.percentage < 100" :percentage="file.percentage"></el-progress>
      <video :width="150" :height="150" :src="file.url">
          您的浏览器不支持视频播放
      </video>
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview" @click="videoPreview(file)">
          <i class="el-icon-zoom-in"></i>
        </span>
        <span class="el-upload-list__item-delete" @click="videoRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
  </el-upload>
    <el-dialog :visible.sync="dialogVisible"  v-bind="preview" append-to-body :destroy-on-close="true">
      <div style="text-align: center">
        <video width="100%" height="500" :src="dialogImageUrl" controls>
            您的浏览器不支持视频播放
        </video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
import { D2pUploader } from 'd2p-extends'
import lodash from 'lodash'
import { d2CrudPlus } from 'd2-crud-plus'
// import log from '../../utils/util.log'
import log from '@/libs/util'
// 文件上传组件,依赖D2pUploader
export default {
  name: 'VideoUploader',
  mixins: [d2CrudPlus.inputBase],
  props: {
    // 选择文件按钮的大小
    btnSize: { default: 'small' },
    // 选择文件按钮的名称
    btnName: { default: '选择文件' },
    // 可选哪些类型的文件
    accept: {},
    // 上传后端类型，[cos,qiniu,alioss,form]
    type: {
      type: String,
      default: undefined // 上传类型：form cos qiniu  alioss
    },
    // 值：url<br/>
    // 或 [url1,url2]<br/>
    // 或 {url:'url',md5:'',size:number}<br/>
    // 或 [{url:'url',md5:'',size:number}]<br/>
    // <br/>
    // limit=1 时 input事件返回 {url:'url',md5:'',size:number}<br/>
    // limit>1 时 input事件返回 数组<br/>
    value: {
      type: [String, Array, Object]
    },
    // 样式后缀 追加到url的后面，进行图片处理，需要到对象存储平台配置样式
    suffix: {
      type: String,
      required: false
    },
    // 返回类型: url=仅返回链接, object=包含md5和size , key=仅返回文件key
    returnType: {
      type: String,
      default: 'url'
    },
    // 自定义参数
    custom: {
      type: Object
    },
    // 内部封装[el-upload](https://element.eleme.cn/#/zh-CN/component/upload)组件的属性参数<br/>
    // 注意，form方式上传的action、name、headers等参数不在此设置
    elProps: {
      type: Object
    },
    // 预览对话框的配置
    preview: {
      type: Object
    },
    // 文件大小限制 <br/>
    // 如果传入{limit,tip(fileSize,limit){vm.$message('可以自定义提示')}}
    sizeLimit: {
      type: Number, Object,
      default: 1024 * 1024 * 50
    },
    // 构建下载url方法
    buildUrl: {
      type: Function,
      default: function (value, item) { return (typeof value === 'object') ? item.url : value }
    },
    // 上传组件参数，会临时覆盖全局上传配置参数[d2p-uploader](/guide/extends/uploader.html)
    uploader: {
      type: Object,
      default () { return {} }
    },
    // 与el-upload一致
    // beforeUpload: {
    //   type: Function
    // }
  },
  data () {
    return {
      fileList: [],
      context: {},
      dialogImageUrl: '',
      dialogVisible: false,
      avatarLoading: undefined
    }
  },
  created () {
    this.emitValue = this.value
    this.initValue(this.value)
  },
  watch: {
    value (value) {
      if (this.dispatch) {
        this.dispatch('ElFormItem', 'el.form.blur')
      }
      this.$emit('change', value)
      if (this.emitValue === value) {
        return
      }
      this.emitValue = value
      this.initValue(value)
    }
  },
  computed: {
    _elProps () {
      const defaultElProps = this.getDefaultElProps()
      Object.assign(defaultElProps, this.elProps)
      return defaultElProps
    },
    avatarUrl () {
      if (this.fileList.length > 0) {
        const file = this.fileList[0]
        // log.debug('file,', file, file.status)
        if (file.response != null && file.response.url != null) {
          return file.response.url
        } else if (file.url != null) {
          return file.url
        }
      }
      return null
    },
    uploadClass () {
      if (this._elProps.listType === 'avatar') {
        return 'avatar-uploader'
      } else if (this._elProps.listType === 'picture-card') {
        if (this.fileList && this._elProps.limit !== 0 && this.fileList.length >= this._elProps.limit) {
          return 'image-uploader hide-plus'
        }
        return 'image-uploader'
      }
      return 'file-uploader'
    }
  },
  methods: {
    videoRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.url === file.url), 1)
      this.$emit('remove', file)
    },
    videoPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleBlur () {
      // console.log('blur')
    },
    beforeUpload(file) {
      let limit = this.sizeLimit
      const isMp4 = file.type === 'video/mp4';
      // const isM3u4 = file.type === 'video/m3u4';
      const isLt50M = (file.size < limit);

      if (!isMp4) {
        this.$message.error('上传视频只支持mp4格式!');
      }
      if (!isLt50M) {
        this.$message.error('上传视频不能超过50MB!');
      }
      return isMp4 && isLt50M;
    },
    getDefaultElProps () {
      return {
        limit: 0,
        listType: 'text',
        showFileList: true,
        action: '',
        onPreview: (file) => {
          if (this._elProps.listType === 'picture-card' || this._elProps.listType === 'picture' || this._elProps.listType === 'avatar') {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
          } else {
            window.open(file.url)
          }
        },
        beforeUpload: async (file) => {
          if (this.beforeUpload) {
            const ret = await this.beforeUpload(file, { vm: this })
            if (ret === false) {
              return
            }
          }

          if (this.sizeLimit == null) {
            console.log('this.sizeLimit  null')
            return true
          }
          let limit = this.sizeLimit
          let showMessage = null
          if (typeof limit === 'number') {
            limit = this.sizeLimit
            showMessage = (fileSize, limit) => {
              if (this.$message) {
                const limitTip = this.computeFileSize(limit)
                const fileSizeTip = this.computeFileSize(file.size)
                this.$message({ message: '文件大小不能超过' + limitTip + '，当前文件大小:' + fileSizeTip, type: 'warning' })
              }
            }
          } else {
            limit = this.sizeLimit.limit
            showMessage = this.sizeLimit.tip
          }
          if (file.size > limit) {
            // log.debug('文件大小超过限制：', file.size)
            showMessage(file.size, limit)
            return false
          }
        }
      }
    },
    setValue (value) {
      this.initValue(value)
      // this.$emit('change', this.fileList)
    },
    getUploader () {
      let type = this.type
      if (this.uploader != null && this.uploader.type != null) {
        type = this.uploader.type
      }
      return D2pUploader.getUploader(type)
    },
    initValue (value) {
      let fileList = []
      if (value == null) {

      } else if (typeof (value) === 'string') {
        if (value !== '') {
          const fileName = value.substring(value.lastIndexOf('/') + 1)
          fileList = [{ value: value, name: fileName }]
        }
      } else if (value instanceof Array) {
        if (value.length > 0 && typeof (value[0]) === 'string') {
          const tmp = []
          value.forEach(item => {
            const fileName = item.substring(item.lastIndexOf('/') + 1)
            tmp.push({ value: item, name: fileName })
          })
          fileList = tmp
        } else {
          fileList = value
        }
      } else if (value instanceof Object) {
        fileList = [value]
      }
      for (const item of fileList) {
        if (item.value == null) {
          item.value = item.url
        }
        item.url = this.buildUrl(item.value, item)
      }
      this.resetFileList(fileList)
    },
    computeFileSize (fileSize) {
      let sizeTip = fileSize
      if (fileSize > (1024 * 1024 * 1024)) {
        sizeTip = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + 'G'
      } else if (fileSize > (1024 * 1024)) {
        sizeTip = (fileSize / (1024 * 1024)).toFixed(2) + 'M'
      } else {
        sizeTip = Math.round(fileSize / (1024)) + 'K'
      }
      return sizeTip
    },
    resetFileList (fileList) {
      this.$set(this, 'fileList', fileList)
    },
    handleUploadProgress (event, file, fileList) {
      if (this._elProps.listType === 'avatar') {
        // log.debug('progress', event, file)
        this.avatarLoading = Math.floor(event.percent)
        if (event.percent === 100) {
          this.avatarLoading = undefined
        }
      }
      this.$emit('progress', event, { file, fileList, vm: this })
    },
    handleUploadFileSuccess (res, file, fileList) {
      res.size = res.size != null ? res.size : file.size
      res.name = res.name != null ? res.name : file.name
      res.value = this.getReturnValue(res)
      const value = this.returnType === 'object' ? res.url : res.value
      const url = this.buildUrl(value, res)
      file.url = res.url = url
      this.resetFileList(fileList)
      this.$emit('success', res, file)
      const list = []
      for (const item of fileList) {
        // if (item.status === 'uploading') {
        //   log.debug('当前文件上传完成，等待剩下的文件全部上传成功后再更新value')
        //   return
        // }
        if (item.response != null && item.response.url != null) {
          list.push({ ...item.response })
        } else {
          list.push(item)
        }
      }
      // log.debug('handleUploadFileSuccess list', list, res)
      this.emit(res, list)
    },
    isHasUploadingItem () {
      const fileList = this.$refs.fileUploader.uploadFiles
      if (fileList && fileList.length > 0) {
        for (const item of fileList) {
          if (item.status === 'uploading') {
            return true
          }
        }
      }
      return false
    },
    handleUploadFileRemove (file, fileList) {
      this.fileList = fileList
      this.emitList(fileList)
      this.$emit('remove', file, fileList)
    },
    handleUploadFileError (err, file, fileList) {
      console.error('文件上传失败', err, file, fileList)
      this.$message({ type: 'error', message: '文件上传失败' })
      this.$emit('error', err, file, fileList)
    },
    previewAvatar ($event) {
      $event.stopPropagation()
      this._elProps.onPreview(this.fileList[0])
    },
    removeAvatar ($event) {
      $event.stopPropagation()
      this.resetFileList([])
      this.emit() // 返回undefined，相当于清空已有的值
    },
    emit (res, list) {
      if (this._elProps.limit === 1) {
        const value = res ? res.value : undefined
        this.emitValue = value
        this.$emit('input', value)
      } else {
        this.emitList(list)
      }
    },
    emitList (list) {
      if (list) {
        const tmp = []
        list.forEach(item => {
          tmp.push(this.getReturnValue(item))
        })
        list = tmp
      }
      this.emitValue = list
      this.$emit('input', list)
    },
    getReturnValue (item) {
      const value = item[this.returnType]
      if (value != null) {
        return value
      }
      return item
    },
    httpRequest (option) {
      Promise.all([
        this.doUpload(option),
        this.computeMd5(option.file)
      ]).then((ret) => {
        // 得到组合结果， size，md5
        const result = ret[0]
        result.md5 = ret[1]
        option.onSuccess(result)
      })
    },
    doUpload (option) {
      let config = this.uploader
      if (config == null) {
        config = {}
      }
      if (!lodash.isEmpty(this._elProps.action)) {
        config.action = this._elProps.action
      }
      if (!lodash.isEmpty(this._elProps.name)) {
        config.name = this._elProps.name
      }
      if (!lodash.isEmpty(this._elProps.data)) {
        config.data = this._elProps.data
      }
      if (!lodash.isEmpty(this._elProps.headers)) {
        config.headers = this._elProps.headers
      }
      if (!lodash.isEmpty(this.custom)) {
        config.custom = this.custom
      }
      const uploadOption = {
        file: option.file,
        fileName: option.file.name,
        onProgress: option.onProgress,
        onError: option.onError,
        config: config
      }
      this.$emit('start', uploadOption)
      return this.getUploader().then(uploader => {
        return uploader.upload(uploadOption)
      }).then(ret => {
        if (this.suffix != null) {
          ret.url += this.suffix
        }
        return ret
      })
    },
    onExceed (files, fileList) {
      // log.debug('文件数量超出限制')
      if (this._elProps.limit === 1) {
        this.clearFiles()
        this.$refs.fileUploader.handleStart(files[0])
        this.$refs.fileUploader.submit()
        return
      }
      this.$message({
        showClose: true,
        message: '已达最大限制数量，请删除一个文件后再上传',
        type: 'warning'
      })
    },
    clearFiles () {
      if (this.$refs.fileUploader != null) {
        this.$refs.fileUploader.clearFiles()
      }
    },
    getFileList () {
      return this.fileList
    },
    computeMd5 (file) {
      return new Promise((resolve, reject) => {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        const chunkSize = 2097152 // Read in chunks of 2MB
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()

        fileReader.onload = (e) => {
          spark.append(e.target.result) // Append array buffer
          currentChunk++

          if (currentChunk < chunks) {
            loadNext()
          } else {
            const md5 = spark.end()
            // log.debug('computed hash', md5) // Compute hash

            resolve(md5)
          }
        }

        fileReader.onerror = function (error) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('md5 computer error', error)
        }

        function loadNext () {
          const start = currentChunk * chunkSize
          const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }

        loadNext()
      })
    }
  }
}
</script>
<style lang="scss">
  .d2p-file-uploader{
    &.is-disabled{
      .avatar-item-wrapper{
        background-color: #F5F7FA;
        border-color: #E4E7ED;
        color: #C0C4CC;
        cursor: not-allowed
      }
      li{
        cursor: not-allowed
      }
      .el-upload-list__item-actions{
        cursor: not-allowed
      }
    }
    .hide-plus{
      .el-upload--picture-card{
        display: none;
      }
    }
    .avatar-uploader{
      display: flex;
      .el-upload{
        width: 100px;
        height: 100px;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
      }
      .el-upload img{
        max-width: 100px;
        max-height: 100px;
      }
      .el-icon-plus.avatar-uploader-icon {
        vertical-align: top;
        font-size: 28px;
        color: #8c939d;
        line-height: 100px;
      }
      .status-uploading{
        border-radius: 6px;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 1;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: opacity .3s;
        transition: opacity .3s;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-progress{
          width: 70px;
          height: 70px;
          .el-progress__text {
            color:#fff;
          }
        }

      }
    }
    .el-upload--picture-card .el-icon-plus.avatar-uploader-icon {
      vertical-align: top;
      font-size: 28px;
      color: #8c939d;
      line-height: 100px;
    }
    .image-uploader .el-upload-list--picture-card .el-upload-list__item-thumbnail {
      max-width: 100%;
      max-height: 100%;
      width:auto;
      height: auto;
    }
     .el-upload-list--picture .el-upload-list__item-thumbnail {
      max-height: 100%;
      height: auto;
    }
    .image-uploader .el-upload-list--picture-card .el-upload-list__item {
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      text-align: center;
      line-height: 125px;
    }
    .image-uploader{
      /*display: flex;flex-wrap: wrap;*/
      .el-upload-list--picture-card .el-upload-list__item-actions{
        line-height: 100px;
      }
      .el-upload-list--picture-card {
        /*display: flex;*/
        /*flex-wrap: wrap;*/
      }
      .el-upload-list__item-status-label{
        line-height: 1;
      }
    }

    .el-upload--picture-card {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      cursor: pointer;
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
    }
    .el-upload-list--picture-card {
      .el-upload-list__item{
        width: 100px;
        height: 100px;
      }
      .el-progress-circle{
        width: 70px !important;
        height: 70px !important;
      }
      .el-progress{
        width: 70px !important;
        height: 70px !important;
      }
    }
    .avatar-item-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      .avatar{
        display: contents;
      }
    }

    .preview{
      border-radius: 6px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.9);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      &:hover{
        opacity: 0.9;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        margin: 0 7px;
        cursor: pointer;
      }
    }
  }

</style>
