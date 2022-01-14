#!/usr/bin/env node
const program=require('commander');
const version=require('./../package.json').version

program.version(version,'-v --version','查看版本')
  .usage('<command> [项目名称]')
  .command('hello','hello')
  .command('init','创建新项目')

program.parse(process.argv)
