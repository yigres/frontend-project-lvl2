install:
	npm ci

publish:
	npm publish --dry-run

genDiff:
	npm link
		
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint: 
	npx eslint .

	