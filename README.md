<p align="center">
    <img alt="Deno Wikipedia CLI" src="./docs/logo.svg" width="220" />
</p>
<h1 align="center">Deno Wikipedia CLI</h1>
<p align="center">
    Search anything on Wikipedia from your terminal.
</p>
<p align="center">
    <a href="https://deno.land/"><img height="20" src="https://img.shields.io/badge/made_with-Deno_1.2.0-000000.svg?logo=deno" alt="Made with Deno"></a>
    <a href="https://www.typescriptlang.org/"><img height="20" src="https://img.shields.io/badge/built_with-TypeScript-007acc.svg?logo=typescript" alt="Built with TypeScript"></a>
    <a href="./LICENSE"><img height="20" src="https://img.shields.io/github/license/icelam/deno-wikipedia-cli?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABHddaYAAAC5UlEQVRIDd2WPWtVQRCGby5pVASLiGghQSxyG8Ui2KWwCfkH9olY2JneQkiR0oCIxH/gB+qVFDYBIWBAbAIRSbCRpLXwIxLiPT7vnNm9e87ZxJtUwYH3zO47Mzv7Mbv3tlo5KYriGtgAJ81OY1ENdG/YI4boFEOI911BXgY/pdtwGuAtXpvmB1tAXHDnUolE5urkPOQo6MqA3pXWmJJL4Bb4rQ7yEYfxsjnIF29NJIoNC6e5fxOL/qN+9KCz7AaLpN8zI415N2i2EptpGrkRIjGeAuvR6IY1hSFLFUOug9Ms2M7ZxIUNytm1mnME186sdI2BOCwAyQMg54ugzSmKmwbPwSbolKH+hbAtQdsOoF+BsF3anUVwBdiOWRidFZDKTTrKEAJTm3GVrGkHzw/uPZbyx7DNNLfB7KGmRsCcr+/gjaiPSpAOTyX9qG4L/XBDdWXDDf1M+wtQ5fwCOtcb4Dto6VpLmzByB6gqdHbTItGSJdAGqibJQhmRfCF7IN4beSF2G9CqnGXQrxofXU+EykllNeoczRgYytDKMubDIRK0g5MF8rE69cGu0u9nlUcqaUZ41W0qK2nGcSzr4D2wV9U9wxp1rnpxn8agXAOHMQ9cy9kbHM7ngY4gFb03TxrO/yfBUifTtXt78jCrjY/jgEFnMn45LuNWUtknuu7NSm7D3QEn3HbatV1Q2jvgIRf1sfODKQaeymxZoMLlTqsq1LF+HvaTqQOzEzUCfni0/eNIA+DfuE3KEtbsegckGmMktTXacnBHPVe687ugkpT+axCkkhBSyRSjWI2xf1KMMVmYiQdWksK9BEFiQoiYLIlvJA3/zeTzCejP0RbB6YPbhZuB+0pR3KcdX0LaJtju0ZgBL8Bd+sbz2QIaU2OfBX3BaQLsgZysQtrk0M8Sh1A0w3DyyYnGnAiZ4gqZ/TvI2A8OGd1YIbF7+F3P+B6dYpYdsJNZgrjO0UdOIhmom0nwL0pnfnzkL1803jAoKhvyAAAAAElFTkSuQmCC" alt="License"></a>
    <a href="https://github.com/icelam/deno-wikipedia-cli/actions?query=workflow%3A%22Unit+test%22"><img height="20" src="https://github.com/icelam/deno-wikipedia-cli/workflows/Unit%20test/badge.svg" alt="Unit test"></a>
    <a href="https://lgtm.com/projects/g/icelam/deno-wikipedia-cli/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/icelam/deno-wikipedia-cli.svg?logo=lgtm"/></a>
    <a href="https://github.com/icelam/deno-wikipedia-cli/releases"><img alt="Current version" src="https://img.shields.io/github/v/release/icelam/deno-wikipedia-cli.svg?sort=semver&label=latest&logo=github"/></a>
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

## Development
You can run this app locally using the following command:
```bash
make dev
```

## Tests
You can run test cases using the following command:
```bash
make test
```

## Update lock file
You can update the lock file by running the following command:
```bash
make lock-deps
```

## Change Log / Release
Change log is available [here](./CHANGELOG.md).
You can update the change log by running the following command:
```bash
make release
```

A Github workflow has been set to automatically create release when `vX.X.X` tag is pushed.

## Roadmap
* [ ] Implement logging, might introduce something like [log4deno](https://deno.land/x/log4deno)?
* [ ] Use [Import Maps](https://deno.land/manual/linking_to_external_code/import_maps) for better maniaging dependencies' version
* [ ] [Permission detection](https://deno.land/typedoc/classes/deno.permissions.html) without using `--unstable` flag
* [ ] Get [terminal size](https://github.com/denoland/deno/pull/6520) without using `--unstable` flag
* [x] ~~Better way to organize test suits, might consider using [Rhum](https://deno.land/x/rhum)?~~

## Others
* [ ] Limit or [revoke the permission](https://deno.land/manual/examples/permissions) when it is not needed (e.g. search flow does not need write permission, read permission is not needed after getting config file, net is not needed for config flow). But need to test if installed excutable would be affected on next run.
* [ ] Good [reference](https://github.com/drashland/deno-drash/tree/master/tests) for test cases
