install:
	npm install

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run
		
test:
	npm test

lint: 
	npx eslint .

	