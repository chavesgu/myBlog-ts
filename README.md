# vue-ts
vue-cli@3.0+ts

In future,this will be my vue template

## include
`vue` `router` `vuex` `axios` `scss` `typescript`

## 目录结构
```txt
vue-ts
├── public              
│ ├── index.html      //项目打包入口
| ├── browser.html    //低版本ie跳转页面
├── src              
│ ├── assets          //静态文件，图片，css
│ | ├── theme         //主题文件，主题色等
│ ├── components      //通用vue组件
│ ├── router          //router配置文件
│ ├── service         //api接口配置文件
│ ├── store           //vuex配置文件
│ ├── utils           //常用工具
│ ├── views           //页面vue文件
│ ├── App.vue         //顶级app入口dom
│ ├── Layout.vue      //布局
│ ├── main.ts         //入口文件
│ ├── element.ts      //element-ui按需加载配置文件
│ ├── echarts.ts      //echarts按需加载配置文件
│ ├── shims-tsx.d.ts
│ ├── shims-vue.d.ts
│ ├── global.d.ts     //全局ts第三方模块注册文件
│ 
├── .gitignore        //git忽略的文件目录
├── .postcssrc.js     //配置自动添加css前缀
├── babel.config.js   //babel配置文件
├── package.json      //npm配置文件
├── README.md         //readme
├── tsconfig.json     //ts配置文件
├── vue.config.js     //vue项目配置文件
├── yarn.lock         //yarn管理node包文件
```