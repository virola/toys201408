#!/bin/sh 

dir="ue-demo"

[ -d $dir ] || {
    mkdir $dir
    echo "create new dir [${dir}]"
}

rm -rf $dir/*
cp -r html asset dep ue-demo 

echo "[OK]copy finished!"

tar -cvf ue-demo.zip ue-demo/
echo "[OK]compress zip finished!"
