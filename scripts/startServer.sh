#!/bin/bash

mkdir -p /var/www/logs
DATE=$(date +%Y-%m-%d) && nodemon /var/www/server/server.js | awk '{ print "[", strftime("%Y-%m-%d %H:%M:%S"), "] ##", $0; fflush(); }' | tee -a /var/www/logs/log_$DATE.txt