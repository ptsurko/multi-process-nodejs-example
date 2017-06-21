#!/bin/bash

echo "$(dirname "$0")"

docker build -t web .

docker tag web ptsurko/web

docker push ptsurko/web
