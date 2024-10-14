# Common Git Commands


## View the Local Branch List
``` bash
git branch
```

## Create a Local Branch
``` bash
git checkout -b <your-branch-name>
```

## Switch Local Branch
``` bash
git checkout <your-branch-name>
```

## Start: Pull from Github into Local Branch
``` bash
git checkout dev
git pull origin dev
git checkout <your-branch-name>
git merge dev
```

## End: Push to Github from Local Branch
``` bash
git add .
git commit -m '<your-comment>'
git checkout dev
git pull origin dev
git merge <your-branch-name>
git push origin dev
```

## Auto-Merging Conflict
* Step 1: Click on 'Accept Both Changes'
* Step 2: Save conflicted file changes
* Step 3: 
``` bash
git add .
git commit -m '<your-comment>'
git push origin dev
```

## Miscellaneous
``` bash
git status
git branch
npx dotenv sequelize-cli db:seed:undo:all
npx dotenv sequelize-cli db:migrate:undo:all
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:seed:all
```
