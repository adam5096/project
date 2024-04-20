#!/usr/bin/env.sh

#abort on errors
set -e

#build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass jekyll processing
echo > .nojekyll

#if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

#if you are deploying to https://adam5096.github.io
#git push -f git@github.com:adam5096/adam5096.github.io.git main


#if you are deploying to https://adam5096.github.io/project
git push -f git@github.com:adam5096/project.git main:gh-pages

cd - 

