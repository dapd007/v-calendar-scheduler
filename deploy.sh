# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'v-calendar.davidpaternina.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:dapd007/v-calendar-scheduler.git master:gh-pages

cd -