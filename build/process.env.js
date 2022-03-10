try {
    // 指定参数map，以及默认值
    const envMap = {
        port: {
            base: "8080", // 启动服务端口号
        },
        report: {
            base: "8888", // 打包分析启动端口号
        },
    }

    // 获取项目启动命令行参数

    // 获取命令行原始参数 并转化为json
    const original = JSON.parse(process.env.npm_config_argv).original
    // console.log(original)
    
    Object.keys(envMap).forEach(arg => {
        // 如果并没有传入命令行参数 则不用配置到process.env上
        const index = original.findIndex(el => el.indexOf(`--${arg}`) > -1)
        if(index === -1) return false;
        

        // 设置参数形式为--port:8089 或者--port=8089
        const reg = new RegExp(`^--${arg}[:=](.*)`);
        
		// 正则截取命令行参数所传入的value
        let arg_val = original[index].replace(reg, '$1')

        // 参数值不传或者不合法时 设置为默认值
        // if(!arg_val && envMap[arg].base) {
        // }

        // 把对应参数设置到process.env上
        process.env[arg.toUpperCase()] = arg_val || envMap[arg].base

    })


} catch(err) {
    console.log("\033[31m 启动参数有误，请查看README.md \033[0m");
}
