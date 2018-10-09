#!/bin/sh
# remove vendor folder
rm -r vendor/
# composer install
php7 composer.phar install
php7 composer dumpautoload -o
php7 artisan config:cache
php7 artisan route:cache

