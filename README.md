# 运行说明

cnpm i 安装依赖

一、开发：npm start 默认端口号为8088

二、更换服务端口号方式

1. PORT=8090 npm start
2. npm start --port=8090 || npm start --port:8090
   两种方式同时使用的话第二种设置会覆盖第一种


三、打包编译：npm run build
四、打包分析：npm run build --report || npm run build --report:9999(自定义端口号)