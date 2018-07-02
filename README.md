# 管理系统通用解决方案之Vue实现
* 介绍

	将大部分管理后台通用的东西抽象出来，如权限设计、数据获取、状态管理等，进行复用。这里采用Vue实现，搭建了一个大体框架，只需简单改动，就可以让管理台开发者可以直接写业务代码，无需再关心这些通用东西的实现。希望对后面需要搭建管理后台的童鞋有所帮助。详情请看文章（http://km.oa.com/articles/show/366841）

* 可复用列表，详情请看文章（http://km.oa.com/articles/show/366841）
    1、权限设计，可以说是业界最优解决方案了，对比请看文章
    2、数据获取---fetch
    3、路由设计
    4、状态管理
    5、其他
	
# 运行demo，查看效果
* demo介绍   

  demo的搭建用到了大部分通用的东西，比如权限控制，有些用户就不能做删除操作，甚至不能访问某个URL，一共4个页面
  ```
    --index.html，首页，配置有权限
    --tab1.html，tab1页面，配置有权限
    --tab2.html，tab2页面，配置无权限
    --login.html，login页面，没有鉴权
  ```
  可以在views/fetchers/permission里面改返回的权限数据来控制权限，下面我们先跑起来
* 安装依赖
```
  npm i
```   
* 构建
```
  npm run d
```
* 访问
```
	http://127.0.0.1:8999/index.html 
```
 
# 运行流程
* 首先获取权限数据，进行权限初始化
* 自定义指令判断是否有权限显示指定视图
* 如果有，vue将访问的路由对应到指定组件，否则渲染没有权限视图
* 组件获取数据后渲染到指定视图

# 文件结构
* c/comps   

  公共基本基本组件，任何地方都可引入，引入方式
```
import BaseInput from 'comps/base-input'
```
* c/directives   

  自定义全局指令
```
  v-permission 权限判断指令，app.vue中有具体用法
  v-imgerr     图片错误处理指令
  v-spa        布局切换指令，app.vue中有具体用法

```
* c/models   

  公共接口，任何地方都可调用，调用方式和公共组件一致
* c/modules    

  js功能模块，下面介绍几个主要功能模块
```
    api-------------------对获取数据的封装，采用fetch，而不是传统的XmlHttpRequest
    bus-------------------全局通信功能模块
    fetcher---------------并发请求
    img-upload------------图片上传
    input-validate--------表单输入的有效性验证，可有效减少if的书写
    permission-config-----权限配置与语义化
    router----------------路由配置模块
    register-global-comps-全局注册常用组件
    scroll----------------window.onscroll回调列表节流滚动加载
    to--------------------摆脱promise使用async和await时的try-catch
```
* c/pages，路由对应的主要业务组件，里面包含状态管理、数据获取等功能
* server/server，简单的本地开放服务器
* views/fetchers，入口数据获取
* views/App.vue，入口组件
* views/entry，入口js
* views/store，入口状态管理文件
* 文件结构更多介绍请看文章（http://km.oa.com/articles/show/366841）

# 开发流程
* 0、引入样式文件         

	   如有需要，请在views/index.html中引入自己的业务样式文件
* 1、权限接口替换        

     将views/fetchers/permission里面的假权限数据换成自己的权限接口，接口返回的数据结构最好与fakeData一致。
* 2、views/App.vue     

	  （1）调整成适合自己的页面布局。  

	  （2）该组件需要判断用户是否登录，因此需要开发者封装自己的登录模块，在modules/login里面，一般是判断某几个cookie是否存在。
* 3、在pages下面开发自己路由对应的业务组件，结构可复用pages/index   

* 4、权限配置    

	   业务组件开发完成后，在modules/permission里面配置该业务组件权限，参考index的权限配置就好
* 5、路由配置   

	   在modules/router下，配置路由对应组件
* 6、状态管理配置   

	   在views/enrty下，参考pages/index的store配置   

  至此，开发流程已经完成，后续如还需进行业务开发，重复3-6步骤即可，基础框架走通   

  PS：    
  
	（1）当需要某个功能的时候，多看看modules下面有没有提供
	（2）图片上传模块在使用时注意换成自己的上传后台服务


# 构建
* 本地开发 (`dev/`)
```
  npm run d            //本地构建,并跑一个server，提供提供热插拔功能，改动即时生效
```

* 测试环境 (`dist/`)
```
/**
 *将js，html发布到测试环境，注意，这里需要开发者deploy到自己组的测试服务器上，
 *请自己到build/deploy中实现
 */
npm run r
```

# 结语
* 使用过程中遇到任何问题，请联系：微信@mobaojunwmy，github@aliarmo，知乎@汪汪
* 更多详情请看文章（http://km.oa.com/articles/show/366841）
* 多页webpack配置：https://github.com/Coffcer/Blog/issues/1

