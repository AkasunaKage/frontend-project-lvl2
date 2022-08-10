install:
	npm ci
publish:
	npm publish --dry-run
	npm link
gendiff:
	node bin/gendiff.js
test:
	npm test
lint:
	npx eslint .