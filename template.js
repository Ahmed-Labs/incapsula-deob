const fs = require('fs');
const types = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

let testing_opts = {
  comments: false,
  minified: true,
  concise: true,
}

let beautify_opts = {
  comments: true,
  minified: false,
  concise: false,
}

const script = fs.readFileSync('unpacked_incapsula.js', 'utf-8');

const AST = parser.parse(script)

// ===== Visitors =====

const hexToAsciiVisitor = {
    StringLiteral(path){
        delete path.node.extra.raw
    },
    NumericLiteral(path){
        delete path.node.extra.raw 
    }
}

// ===== Traversals =====

traverse(AST, hexToAsciiVisitor);


const final_code = generate(AST, beautify_opts).code;

fs.writeFileSync('incapsula_final.js', final_code);
