.PHONY: dev test deps-info fmt fmt-check first-release release

SRC_FOLDER=	./src
ENTRY_FILE=	/mod.ts
DEPS_FILE=	/deps.ts

# Run wiki-cli locally
dev:
	@deno run --allow-net --allow-run --allow-env --allow-read --allow-write --unstable ${SRC_FOLDER}${ENTRY_FILE}

# Run unit test
test:
	@deno test --unstable -A ${SRC_FOLDER}

# Dependencies inspector
deps-info:
	@deno info --unstable ${SRC_FOLDER}${DEPS_FILE}

# Create dependencies lock file
lock-deps:
	@deno cache ${SRC_FOLDER}${DEPS_FILE} --lock=lock.json --lock-write

# Reload all dependencies and create lock file
reload-deps:
	@deno cache ${SRC_FOLDER}${DEPS_FILE} --reload --lock=lock.json --lock-write

# Print documentation for each exported members (not in use)
# Currently only support 'export <declaration>' and 'export ... from ...' syntax
doc:
	@deno doc --unstable

# Format code (not in use)
# Will switch to built-in fmt once Deno allow configurations on fmt command
fmt:
	@deno fmt ${SRC_FOLDER}

# Format code (dry run, not in use)
fmt-check:
	@deno fmt --check ${SRC_FOLDER}

# Create the first release
first-release:
	@npx standard-version --first-release

# Create a new release
release:
	@npx standard-version --first-release
