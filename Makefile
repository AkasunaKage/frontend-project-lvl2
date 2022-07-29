install:
	npm ci
publish:
	npm publish --dry-run
	npm link
gendiff:
	node gendiff.js
lint:
	npx eslint .