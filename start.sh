#!/usr/bin/env bash

export NODEJS_HOME=/usr/local/lib/node/nodejs
export PATH=$NODEJS_HOME/bin:$PATH

cd -- "$( dirname -- "${BASH_SOURCE[0]}" )"

echo $PATH

while true ; do
    npm start
    echo 'exited'
    sleep 10
    echo 'restart!!'
done
