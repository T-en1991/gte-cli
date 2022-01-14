#!/usr/bin/env node
const program=require('commander')
const inquirer=require('inquirer')
const shell=require('shelljs')
const chalk=require('chalk')
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const initAction=()=>{
  inquirer.prompt([{
    type:'input',
    message:'请输入项目名称',
    name:'name'
  }]).then((answers=>{
    const list = glob.sync('*') // 遍历当前目录
    if (list.length) { // 如果当前目录不为空
      if (list.filter(name => {
        const fileName = path.resolve(process.cwd(), path.join('.', name))//获取全路径
        const isDir = fs.statSync(fileName).isDirectory()//是否是文件夹
        return name.indexOf(answers.name) !== -1 && isDir//有相同名字的文件且是文件夹
      }).length !== 0) {
        console.log(`项目${answers.name}已经存在`)
        return
      }
      create(answers)
    } else {
      create(answers)
    }
  }))
}
program.version(require('./package.json').version)
program.usage('<command> [项目名称]')
program.command('create').description('创建项目').action(initAction)
program.parse(process.argv)

function create(answers){
  console.log('项目名称为'+answers.name)
  console.log('正在拷贝项目，请稍等！')
  const remote=`https://github.com/T-en1991/gte-ui.git`;
  const curName=`gte-ui`;
  const tarName=answers.name;

  // `git clone ${remote} --depth=1
  //       mv ${curName} ${tarName}
  //       rm -rf ./${tarName}/.git
  //       cd ${tarName}
  //       npm install`

  shell.exec(
    `git clone ${remote} --depth=1
          mv ${curName} ${tarName}
          rm -rf ./${tarName}/.git
      `,(error,sdtout,sdterr)=>{
      if (error){
        console.log(error)
        return
      }
      console.log(`    `)
      console.log(`    `)
      console.log(chalk.green(`-------下载安装完成-------`))
      console.log(`    `)
      console.log(`    `)
    }
  )
}
