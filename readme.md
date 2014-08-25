fe模块
======

### 目录结构

    root
    |
    |- asset/       // 压缩编译后的代码，上线目录
    |- dep/         // 第三方引入库文件，上线目录
    |- src/         // 源代码目录
    |- tasks/       // grunt任务配置存放目录
    |
    |- .bowerrc         // bower配置
    |- Gruntfile.js     // grunt运行配置文件
    |- package.json     // node package配置


## 开发环境

Step1: 开发工具

1. [node](<http://www.nodejs.org/>)  
1. [bower](http://bower.io/) 
    
    	[sudo] npm install -g bower
    
1. [grunt](http://gruntjs.com/)

		[sudo] npm install -g grunt-cli
		

Step2: 环境准备

1. 安装npm依赖。执行：

		npm install .

1. bower安装dep第三方依赖库，代码自动部署在[dep]目录中。执行：

		bower install .
	
1. 查看当前有哪些grunt任务：

		grunt --help
	
## 如何开发

### 目录部署

src目录中，根据不同smarty页面，代码分子目录部署。如：

	- common/  	-> 公共代码，生成如common.css, common.js
	- home/   	-> 首页
	- list/    	-> 列表页
	- detail/  	-> 详情页
	- zone/ 	-> 小区页

### 启动监听任务自动编译

应用 `grunt` 工具，我们可以在开发时执行监听任务，让代码以源码的形式自动编译到asset目录中。

如何启动监听任务：

		grunt watch:[taskname]   // eg.  grunt watch:home

那么在你修改 src/ 下对应子目录的代码时，会自动触发该编译任务。

这些任务在 `tasks/` 目录中都有配置。

### 如何开发新页面

步骤：

1. 在 `src/` 和 `asset/` 目录中新建对应的命名空间目录
2. 在 `tasks/` 目录中新建对应grunt任务文件，参考其他任务文件（如home.js）建立即可


## 如何编译

### 开发源码编译		

执行：

	grunt [taskname] 		// eg. grunt home
    grunt debug    // 整个项目文件的调试

这时候代码仅仅做了concat，方便debug

### 部署编译
		
执行：

	grunt [taskname]-release   	// eg. grunt home-release
    grunt release   // 编译整个项目
	

这时在asset里生成的代码就是最终可上线代码。