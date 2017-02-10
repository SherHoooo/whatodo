## [Whatodo](http://sherhoooo.cn:9020/)

![任务页](http://upload-images.jianshu.io/upload_images/2400052-550637524d1ad0fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 介绍
这是我的一个**React-Redux-webpack**的应用。练手之作，多有不足，请多包涵:flushed:。
这个项目包含了*react*、*redux*、*react-router*等多方面的知识，可以说给我的收获颇多。

-------------
### 开始

```
git clone https://github.com/SherHoooo/whatodo.git
// 前端
cd whatodo && npm install 
# run dev
npm run start
// 服务端
cd whatodo\server
node app
```
--------------------------
### 构建工具-**[react-redux-antd](https://github.com/Justin-lu/react-redux-antd)**
这个脚手架工具包括以下功能：
- hot reloading/browser-sync/redux devtools on dev build 
- es6/webapck
- sass support
- UI Kit: Ant Design
- isomorphic-fetch
- example app

采用isomorphic-fetch和react-thunk来完成异步action的功能，示例代码也比较详细，结构清晰，reducer文件夹内的reducerGenerate文件用来生成异步action的reducer。感谢作者的无私奉献，比心:relaxed:。
此外，整个项目的设计参考[石墨](https://shimo.im)、[Teambition](https://www.teambition.com)

-----------------
