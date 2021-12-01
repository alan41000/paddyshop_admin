import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('d2-crud-plus', `v${process.env.VUE_APP_VERSION}`)
    }
  }
}
