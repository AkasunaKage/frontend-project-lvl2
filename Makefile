install-deps:
	npm ci
	npm link
publish:
	npm publish --dry-run
	npm link
gendiff:
	node bin/gendiff.js
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
lint:
	npx eslint .