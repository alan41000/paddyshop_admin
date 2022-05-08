

项目简述
----

基于 [D2Admin](https://gitee.com/d2-projects/d2-admin) 和 [d2-crud-plus](https://gitee.com/greper/d2-crud-plus) 实现的 [PaddyShop admin端]

项目运行和发布
----

- 修改配置文件
```
根目录下.env.development文件，修改VUE_APP_PROXY_API为你的测试网址
```

- 安装依赖
```
npm install
```

- 开发模式运行
```
npm run dev
```

- 编译项目
```
npm run build
```

- 发布项目
```
将编译完成的所有文件，复制替换到商城后端项目的/public/admin目录下
```

## 浏览器兼容

Modern browsers and IE10.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| --- | --- | --- | --- | --- |
| IE10, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |