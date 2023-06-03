#!/usr/bin/env node

const minimist = require("minimist");
const fs = require("fs-extra");
const path = require('path')    // 路径获取
const inquirer = require('inquirer')    //命令行用户交互
const ejs = require('ejs')  // 模板引擎
const { reset, yellow, green, cyan, magenta } = require('kolorist'); // 用于设置输入输出颜色

// 脚手架的工作过程：启动 => 命令行询问用户问题 => 结合问题答案+模板 => 生成结构文件

// 解析参数
const argv = minimist(process.argv.slice(2), { string: ['_'] })

let projectName = argv._[0] || 'chuck-projects'
let argTemplate = argv.t || argv.template

// 所有内置模板
const FRAMEWORKS = [
    {
        name: 'vue2-components-dev',
        color: yellow,
    },
    {
        name: 'vue3-components-dev',
        color: green,
    },
    {
        name: 'vue3-admin-naive',
        color: cyan,
    },
    {
        name: 'vue3-h5-vant',
        color: magenta,
    },
]
// 所有模板
const TEMPLATES = FRAMEWORKS.map(
    (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), [])

inquirer.prompt([
    {
        type: 'list',
        name: 'template',
        when(answers) {
            return !argTemplate || !TEMPLATES.includes(argTemplate)
        },
        message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
            ? reset(
            `"${argTemplate}"不是一个有效的模板，请选择以下模板: `,
            )
            : reset('请选择一个模板:'),
        initial: 0,
        // 生成所有内置模板选项
        choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
                name: frameworkColor(framework.name),
                value: framework,
            }
        }),
    },
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称:',
        default: projectName // 默认值
    },
    {
        type: 'input',
        name: 'version',
        message: '请输入项目版本号:',
        default: '1.0.0' // 默认值
    },
    {
        type: 'input',
        name: 'description',
        message: '请输入项目备注:'
    },
    {
        type: 'input',
        name: 'author',
        message: '请输入作者名称:'
    }
])
.then(anwsers => {
    // anwsers: { name: "xxx" } //anwsers返回一个结果对象
    const templates = anwsers.template && anwsers.template.name || argTemplate

    // 模板目录绝对路径
    const tmplDir = path.join(__dirname, 'templates/' + templates)

    // 目标目录
    const destDir = process.cwd() + '/' + projectName

    // 创建目录
    !fs.existsSync(destDir) && fs.mkdir(destDir, throwError)

    // 读取目录下所有文件
    let readFiles = (dir) => {
        return new Promise((resolve, reject)=>{
            // 参数1：目录路径
            // 参数2：回调函数（错误对象，files为文件相对路径组成的数组）
            fs.readdir(dir, (err, files) => {
                if (err) reject(err)
                resolve(files)
            })
        })
    }

    // 处理模板文件
    let ejsRender = (file) => {
        return new Promise((resolve, reject)=>{
            // 模板文件绝对路径
            let dir = path.join(tmplDir, file)
            // 参数1：文件路径
            // 参数2：数据对象
            // 参数3：回调函数（错误对象，渲染后的新文件）
            ejs.renderFile(dir, anwsers, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }


    // 1、先读取目录下所有文件
    // 2、使用ejs渲染所有模板
    // 3、再将新文件写到目标路径
    readFiles(tmplDir).then((files)=>{
        files.forEach(file => {
            let fileDestDir = path.join(destDir, file)   // 目标路径
            let fileCurDir = path.join(tmplDir, file) // 模板路径
            let stat = fs.lstatSync(fileCurDir);
            if(stat.isDirectory()){
                fs.copy(fileCurDir, fileDestDir, throwError)
            }else{
                ejsRender(file).then((result)=>{
                    fs.writeFileSync(fileDestDir, result)
                }, throwError)
            }
        })
    },throwError)
})

/**
 * 错误处理函数
 * @param {*错误对象} error 
 */
function throwError(error){
    if(error) throw error
}
