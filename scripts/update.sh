#!/bin/bash

cd /root/smartHome/repo
git pull

mkdir -p /var/www/html
mkdir -p /var/www/server

screen -S smartHome_server -X quit

rm /var/www/html/* -r
rm /var/www/server/* -r

#cp /root/smartHome/repo/frontend/* /var/www/html -r
cp /root/smartHome/repo/mock/* /var/www/html -r
cp /root/smartHome/repo/server/* /var/www/server -r
cp /root/smartHome/config.js /var/www/server/config.js
cp /root/smartHome/repo/scripts/startServer.sh /var/www/startServer.sh
cp /root/smartHome/repo/scripts/update.sh /root/smartHome/update.sh


#cd /var/www/html && npm install
cd /var/www/server && npm install

sleep 5
screen -S smartHome_server -dm bash -c "sh /var/www/startServer.sh"