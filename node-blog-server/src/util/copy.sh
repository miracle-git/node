#!/bin/sh
cd /Users/miracle/Desktop/DevOps/M2.Frontend/server/projects/node-blog-server/log
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
