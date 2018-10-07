#!/bin/sh
# condition: index.php is configured

# set permission to storage folder
chmod -R o+x storage

# update project
php7 composer.phar install
php7 composer dumpautoload -o
php7 artisan config:cache
php7 artisan route:cache