#!/usr/bin/env node

// 设置终端输出的字体颜色
const chalk = require("chalk");
// 设置终端输出的loadding的图标和字体
const ora = require("ora");
// node.js命令行指令解析库
const program = require("commander");

const {
    exec
} = require('child_process');

const spinner = ora('正在使用 npm install @tarojs/cli -g 全局安装taro...').start();

// 全局安装taro
const INSTALL_TARO = 'npm install @tarojs/cli -g';
// 修改taro的模板源
const SET_TEMPLATE_SOURCE = 'taro config set templateSource github:eattopking/taro-ws-templates';
// 项目初始化
const TARO_INIT = '请执行 taro init --clone 初始化项目';

// 全局安装taro
const handleInstallTaro = () => new Promise((resolve) => {
    exec(INSTALL_TARO, function(error, stdout, stderr){
        if(error) {
            console.error('error: ' + error);
            return;
        }

        spinner.succeed('taro全局安装完成');
        resolve();
    });

})

// 设置自定义模板源
const handleSetTemplateSource = () => {
    spinner.start('正在设置微师自定义项目模板...');

    exec(SET_TEMPLATE_SOURCE, function(error){
        if(error) {
            console.error('error: ' + error);
            return;
        }

        spinner.succeed('自定义项目模板设置完成');
        console.log(chalk.green(TARO_INIT));
    });
}

// 获取命令行输入
program
    .version("1.0.0", "-v, --version", "version")
    .usage("[options] <file ...>")
    .description("tarows")
    .alias("xf")
    .option("-s, --show <show>")
    .command("init")
    .action(() => {
        createProject();
    });
program.parse(process.argv);

// 创建项目
function createProject() {
    handleInstallTaro().then(() => {
        handleSetTemplateSource();
    });
}