import * as fs from 'fs'
import sqlFormatter from 'sql-formatter';
//console.log(sqlFormatter.format('select `a`.`c`, `b`.`b` from table where x=3'))

let command = require('optimist')
      .usage('SQL formatter')
      .default('i', '-')
      .default('o', '-')
      .default('s', 'std')
      .alias('i', 'file')
      .alias('o', 'out')
      .alias('s', 'sql')
      .alias('h', 'help')

      .describe('i', 'Load a file. "-" - stdin')
      .describe('s', 'Sql dialect: "std" Standard SQL, "n1ql" Couchbase N1QL, "db2" IBM DB2')
      .describe('o', 'Output file name. "-" - stdout');
let argv = command.argv;

if (argv.h) {
  command.showHelp();
  process.exit();
}

const supportedDialects = ['std', 'n1ql', 'db2'];
const dialect = argv.s;
if (!~supportedDialects.indexOf(dialect)) {
  console.error(`Dialect "${dialect}" does not supported. Supported: ` + supportedDialects.join(', '));
  process.exit(1);
}

let options = {
  language: dialect
};

let inFile = argv.i;
let outFile = argv.o;
let data = '';

if (inFile == '-') {
  let input = process.stdin;
  input.resume();
  input.setEncoding('utf8');
  input.on('data', chunk => data += chunk);
  input.on('end', () => {
    format(data);
  });
} else {
  format(fs.readFileSync(inFile, 'utf8'));
}

function format(data) {
  const formatted = sqlFormatter.format(data, options);
  if (outFile == '-') {
    console.log(formatted);
  } else {
    fs.writeFileSync(outFile, formatted, 'utf8');
  }
}
