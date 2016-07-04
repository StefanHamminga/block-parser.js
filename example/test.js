const util      = require('util');
const parser    = require('block-parser')();

const sample_text = "var bla = '{}';\nif (true) {\n\tlet test = \"my test variable\";\n} else {\n\tconsole.log(\"bla\");\n}\n";

console.log(
    util.inspect(
        parser.find(sample_text),
        { colors: true }));

console.log(
    util.inspect(
        parser.get(sample_text),
        { colors: true }));
