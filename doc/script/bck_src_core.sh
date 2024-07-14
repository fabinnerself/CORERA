#!/bin/bash

cd /var/www/html/eu/

sudo zip -r /var/www/backup/src_corera_`date +"%Y%m%d%H%M%S"`.zip corera/

