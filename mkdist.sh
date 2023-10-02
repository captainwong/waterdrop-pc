#!/bin/bash

set -e

yarn build
rm -rf waterdrop-pc-dist/
mv dist waterdrop-pc-dist
rm -f waterdrop-pc-dist.tar.gz
tar -zcvf waterdrop-pc-dist.tar.gz waterdrop-pc-dist/
scp ./waterdrop-pc-dist.tar.gz root@captainwong.cn:/var/www/waterdrop-pc-dist.tar.gz

ssh -t root@captainwong.cn "cd /var/www && rm -rf waterdrop-pc-dist && tar -zxvf waterdrop-pc-dist.tar.gz"
