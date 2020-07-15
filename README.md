<p align="center">
    <img alt="Deno Wikipedia CLI" src="./docs/logo.svg" width="220" />
</p>
<h1 align="center">Deno Wikipedia CLI</h1>
<p align="center">
    Search anything on Wikipedia from your terminal.
</p>
<p align="center">
    <a href="https://deno.land/"><img height="20" src="https://img.shields.io/badge/made_with-Deno-000000.svg?logo=deno" alt="Made with Deno"></a>
    <a href="https://www.typescriptlang.org/"><img height="20" src="https://img.shields.io/badge/built_with-TypeScript-007acc.svg?logo=typescript" alt="Built with TypeScript"></a>
</p>

## Important Notes
This is a experimental project written in [Deno](https://github.com/denoland/deno) version 1.2.0, with `std` version 0.61.0. Some feature might be unstable at the moment.

## Features
* Get a Wikipedia page
* Display a random Wikipedia page
* Search in different languages

## Installation
You can install the executable directly from GitHub.
```bash
deno install --unstable --allow-net --allow-run --allow-env --allow-read --allow-write -n wiki-cli https://raw.githubusercontent.com/icelam/deno-wikipedia-cli/master/src/mod.ts
```

## Usage
Run `wiki-cli` in your terminal followed by any of the option flags.

A list of valid Wikipedia language codes is available at [https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&smlangprop=code&format=json](https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language&smlangprop=code&format=json).

```
Usage: 
  wiki-cli [options]

Options: 
  -h, --help                            Show help and all available options
  -c, --config                          Modify default behavior of wiki-cli, currently support saving default language to be used in search
  -l, --language [WIKI_LANGUAGE_CODE]   Temporary set the target language to be used in search, accepts a Wikipedia language code
  -q, --query [KEYWORD]                 Pre-define the keyword used in search
  -r, --random                          Display a random Wikipedia page
```

![Preview](./docs/preview.png)

## Tests
You can run test cases using the following command:
```bash
deno test --unstable ./src
```

## Roadmap
* [ ] Implement logging, might introduce something like [log4deno](https://deno.land/x/log4deno)?
* [ ] Use [Import Maps](https://deno.land/manual/linking_to_external_code/import_maps) for better maniaging dependencies' version
* [ ] [Permission detection](https://deno.land/typedoc/classes/deno.permissions.html) without using `--unstable` flag
* [ ] Get [terminal size](https://github.com/denoland/deno/pull/6520) without using `--unstable` flag
* [ ] Better way to organize test suits, might consider using [Rhum](https://deno.land/x/rhum)
