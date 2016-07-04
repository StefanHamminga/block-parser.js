"use strict";

const cfg = {
    quotes: "\"\"''``“”‘’””«»「」",
    pairs: "{}"
};

/**
 * Find the first code block in a given input string. Offset and length may be
 * omitted.
 * @param  {String} string String to search through
 * @param  {Number} offset Start searching from index `offset`. Default: 0
 * @param  {Number} length Search up to index `length` from the start of the
 *                         string. Default: string.length
 * @return {Array}         [ match_start_index, match_end_index,
 *                           opening_character, closing_character ]
 */
function find(string, offset, length) {
    var block_level = 0;
    var in_quote = false;

    let start, end, opening, closing;


    var c, i, l, index;
    for (i = offset || 0, l = length || string.length; i < l; i++) {
        c = string.charAt(i);
        if (c === '\\') { // skip escaped characters
            i++;
        } else {
            // Check for comment blocks
            index = cfg.quotes.indexOf(c);
            if (index > -1) {
                if (c === in_quote) {
                    in_quote = false;
                } else if (index % 2 === 0) {
                    in_quote = cfg.quotes[index + 1]; // Set to corresponding closing quote
                }
            } else if (!in_quote) {
                if (closing) {
                    if (c === opening) {
                        block_level++;
                    } else if (c === closing) {
                        if (block_level === 1) {
                            return [ start + 1, i, opening, closing ];
                        } else {
                            block_level--;
                        }
                    }
                } else {
                    // New block handling
                    index = cfg.pairs.indexOf(c);
                    if (index > -1) {
                        if (index % 2 === 0) {
                            block_level++;
                            start = i;
                            opening = c;
                            closing = cfg.pairs[index + 1];
                        }
                    }
                }
            }
        }
    }
}

/**
 * Split `string` into a pre-match string, the matching code block and a
 * post-match string. Offset and length may be omitted.
 * @param  {String} string String to search through
 * @param  {Number} offset Start searching from index `offset`. Default: 0
 * @param  {Number} length Search up to index `length` from the start of the
 *                         string. Default: string.length
 * @return {Array}         [ pre-match_or_full_string, matching_block,
 *                           post-match_string ]
 */
function get(string, offset, length) {
    var res = find(string, offset, length);
    if (res) {
        return [
            string.substring(0, res[0]),
            string.substring(res[0], res[1]),
            string.substring(res[1]) ];
    } else {
        return [ string ];
    }
}

/**
 * Load the block-parser with an optional configuration object.
 * @param  {Object} config { quotes: "''" }
 * @return {Object}        parser { find, get }
 */
module.exports = function (config) {
    if (config) {
        if (config.pairs)  cfg.pairs  = config.pairs;
        if (config.quotes) cfg.quotes = config.quotes;
    }

    return {
        find: find,
        get: get
    };
};
