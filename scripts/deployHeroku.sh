#!/bin/bash

# build
yarn build

#push to heroku repo
cd release
git add .
git commit -m "update build"
git push heroku master
