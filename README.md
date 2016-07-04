# block-parser
JavaScript text parser to extract code blocks delimited by character pairs (brackets, braces, quotes, etc).

Block-parser skips over any commented sections and locates the complete first code block it can find.

## Installation

```bash
npm install --save block-parser
```

## Usage

```js
const parser = require('block-parser')();
//or
const parser = require('block-parser')({ pairs: "()" });

function my_parser( code_block_start,
                    code_block_end,
                    opening_bracket,
                    closing_bracket) {
    // Do stuff
}

my_parser(...parser.find(my_text));

// or

function my_parser(prefix_string, code_block, postfix_string) {
    if (code_block) {
        // Do stuff
    } else {
        // no code block was found, the complete input string is available in
        // `prefix_string`
    }
}

my_parser(...parser.get(my_text));
```

## Configuration options

Option|Default|Description
----|---|---
pairs|`"{}"`|Code block delimiter pairs.
quotes|`"\"\"''``“”‘’””«»「」"`| String of quotation character pairs.

## Notes and license

This project is available on [GitHub](https://github.com/StefanHamminga/block-parser.js) and [npm](https://www.npmjs.com/package/block-parser).

The project is licensed as LGPL v3.0 and may be freely used and distributed as such.

Copyright 2016 [Stefan Hamminga](mailto:stefan@prjct.net) - [prjct.net](https://prjct.net)
