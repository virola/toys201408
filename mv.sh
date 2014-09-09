#!/bin/sh


target="$1"

if [ "$target" == "" ]; then
    target='../ui-web/static/'
fi 

echo "Copy assets to dir [$target]..."

cp -r asset "$target/"

echo "[OK]Copy finished!"

date=`date '+%Y-%m-%d %H:%M:%S'`
echo "$date";

