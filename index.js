#!/usr/bin/env node
const program=require('commander')
const inquirer=require('inquirer')
const shell=require('shelljs')
const initAction=()=>{
  inquirer.prompt([{
    type:'input',
    message:'请输入项目名称',
    name:'name'
  }]).then((answers=>{
    console.log('项目名称为'+answers.name)
    console.log('正在拷贝项目，请稍等！')
    const remote=`https://github.com/T-en1991/gte-ui.git`;
    const curName=`gte-ui`;
    const tarName=answers.name;

    shell.exec(
      `git clone ${remote} --depth=1
          mv ${curName} ${tarName}
          rm -rf ./${tarName}/.git
          cd ${tarName}
          npm install
      `,(error,sdtout,sdterr)=>{
        if (error){
          console.log(error)
          return
        }
        console.log(`    `)
        console.log(`    `)
        console.log(`-------下载安装完成-------`)
        console.log(`    `)
        console.log(`    `)
      }
    )
  }))
}
program.version(require('./package.json').version)
program.command('init').description('创建项目').action(initAction)
program.parse(process.argv)
