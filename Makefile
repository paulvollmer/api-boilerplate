DEBUG = DEBUG=lorem,lorem:*
BIN = ./node_modules/.bin
TESTS = server/test/*.test.js
MOCHA_OPTS = -b --timeout 10000 --reporter spec

lint:
	@echo "Linting..."
	@$(BIN)/eslint .
test: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/_mocha $(MOCHA_OPTS) $(TESTS)
test-cov: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/istanbul cover $(BIN)/_mocha -- $(MOCHA_OPTS) $(TESTS)
test-coveralls: test-cov
	@cat ./coverage/lcov.info | $(BIN)/coveralls --verbose
.PHONY: lint test test-cov test-coveralls

start-dev:
	@NODE_ENV=development $(DEBUG) $(BIN)/nodemon --config ./config/nodemon.json .
start-staging:
	@NODE_ENV=staging $(DEBUG) $(BIN)/nodemon --config ./config/nodemon.json .
.PHONY: start-dev start-staging
