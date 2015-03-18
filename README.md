# google-caja-sanitizer

Port of the google caja html sanitizer library.

forked from [node-google-caja](https://github.com/superkhau/node-google-caja)

modified to allow data-* attributes while sanitizing the html input.

## Install
You can install using the following command

```
#!shell
<root-directory>$ npm i --save google-caja-sanitizer

```

## Use

Require the library and go

```
#!nodejs

var sanitize = require('google-caja-sanitizer').sanitize;
var result = sanitize('test<script>console.log("hi there");</script><div data-fruit="Apple">Apple</div>');

// Output:
// 'test<div data-fruit="Apple">Apple</div>'
```

# Documentation Page
Please check the [google page](https://code.google.com/p/google-caja/wiki/JsHtmlSanitizer) for more info on google caja sanitizer
