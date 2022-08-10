### Hexlet tests and linter status:
[![Node CI](https://github.com/AkasunaKage/frontend-project-lvl2/actions/workflows/actions.yml/badge.svg)](https://github.com/AkasunaKage/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/AkasunaKage/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/AkasunaKage/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/3d5de47f45d588e7cf16/maintainability)](https://codeclimate.com/github/AkasunaKage/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3d5de47f45d588e7cf16/test_coverage)](https://codeclimate.com/github/AkasunaKage/frontend-project-lvl2/test_coverage)

# Generator of difference

## Description

Show difference between two files. Supporting formats: JSON, YML, YAML

 [![asciicast](https://asciinema.org/a/BTqdzMmuZTXYyVyDtSrPsroN1.svg)](https://asciinema.org/a/BTqdzMmuZTXYyVyDtSrPsroN1)

## How to install

1. Make sure you have installed Node.js no lower version 12: `node -v`
2. Clone repository: `git@github.com:AkasunaKage/frontend-project-lvl2.git`
3. Change directory to frontend-project-lvl2
4. Run the command: `make install-deps`

## Run tests

```make test```

## How to use

Use `gendiff` command and paths to your files. You can see difference in three ways: stylish (default), plain and json.

```gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -r, --replacer <char>  output replacer (default: "    ")
  -h, --help             display help for command```

