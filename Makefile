.PHONY: dev test fmt fmt-check

dev:
	@deno run --allow-net --allow-run --allow-env --allow-read --allow-write --unstable ./src/mod.ts

test:
	@deno test --unstable ./src

# Below fmt command are currently not in use
# Will switch to built-in fmt once Deno allow configurations on fmt command
fmt:
	@deno fmt ./src

fmt-check:
	@deno fmt --check ./src
