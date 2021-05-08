# Difference calculator  
Difference calculator a program that determines the difference between two data structures.  

[![gendiff CI](https://github.com/yigres/frontend-project-lvl2/workflows/gendiff%20CI/badge.svg)](https://github.com/yigres/frontend-project-lvl2/actions) 
[![Maintainability](https://img.shields.io/codeclimate/maintainability/yigres/frontend-project-lvl2)](https://codeclimate.com/github/yigres/frontend-project-lvl2/maintainability) 
[![Test Coverage](https://img.shields.io/codeclimate/coverage/yigres/frontend-project-lvl2)](https://codeclimate.com/github/yigres/frontend-project-lvl2/test_coverage) 
[![hexlet-check](https://github.com/yigres/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/yigres/frontend-project-lvl2/actions?query=workflow%3Ahexlet-check)    

***
Utility features:

* Support for different input formats: yaml, json
* Generating a report in formats: plain text, stylish, json
* The package can be used as a library  
  
## Usage as console utility  

### Installation  
```sh
$ git clone git@github.com:yigres/frontend-project-lvl2.git
$ cd frontend-project-lvl2
$ npm link  
```

### Usage
```sh
# help info output
$ gendiff -h
```
```sh
# plain format output
$ gendiff --format plain path/to/file.yml another/path/file.json
```
```sh
# stylish format output
$ gendiff filepath1.json filepath2.json
```
## Usage as library  

### Installation  
```sh
$ git clone git@github.com:yigres/frontend-project-lvl2.git
$ cd frontend-project-lvl2
$ npm pack  
$ cp hexlet-code-1.1.4.tgz /path/to/dir  
$ cd /path/to/dir
$ install hexlet-code-1.1.4.tgz

```
### Usage  
```js
// gendiff.js
import gendiff from '@hexlet/code';

const filepath1 = '/path/to/file1.json';
const filepath2 = '/path/to/file2.yaml';

const stylishOutput = gendiff(filepath1, filepath2); // stylish by default
console.log(stylishOutput); // =>
// {
//   + follow: false
//     setting1: Value 1
//   - setting2: 200
//   - setting3: true
//   + setting3: {
//         key: value
//     }
//   + setting4: blah blah
//   + setting5: {
//         key5: value5
//     }
// } 
```
```js
const plainOutput = gendiff(filepath1, filepath2, 'plain');
console.log(plainOutput); // =>
// Property 'common.follow' was added with value: false
// Property 'group1.baz' was updated. From 'bas' to 'bars'
// Property 'group2' was removed
```  
## Demo  

Runs help and version output.  
Get the difference of two flat json files.  
[Asciinema 1](https://asciinema.org/a/374139)  

Get the difference of two flat json files and two flat yaml files.  
[Asciinema 2](https://asciinema.org/a/375201)  


Specify "stylish" output format for the difference between the two deep files.  
[Asciinema 3](https://asciinema.org/a/377800)  


Specify "plain" output format for the difference between the two deep files.  
[Asciinema 4](https://asciinema.org/a/377978)  


Specify "json" output format for the difference between the two deep files.  
[Asciinema 5](https://asciinema.org/a/379332)
    