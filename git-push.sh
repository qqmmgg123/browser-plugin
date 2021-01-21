#!/bin/sh
# 确保脚本抛出遇到的错误
set -e

#给出一个默认的项目路径
path="/root/browser-plugins/downloader"

#先进入项目当中
cd $path

echo "####### 进入项目 #######"
 
ls
 
echo "开始执行git提交命令"
 
git add .
 
git status
 
#写个sleep 1s 是为了解决并发导致卡壳
 
sleep 1s
 
echo "####### 添加文件 #######"
 
git commit -m "$1"
 
echo "####### commit #######"
 
sleep 1s
 
echo "####### 开始推送 #######"
 
git push
 
echo "####### 推送成功 #######"

# node /root/vbox/release-dd.js "$1"

echo "####### 版本更新成功 #######"