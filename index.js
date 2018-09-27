import * as fs from 'fs';
import sqlFormatter from 'sql-formatter';
import optimist from 'optimist';

let command = optimist
      .usage('SQL formatter')
      .default('i', '-')
      .default('o', '-')
      .default('s', 'sql')
      .alias('i', 'file')
      .alias('o', 'out')
      .alias('s', 'sql')
      .alias('h', 'help')

      .describe('i', 'Load a file. "-" - stdin')
      .describe('s', 'Sql dialect: "sql" Standard SQL, "n1ql" Couchbase N1QL, "db2" IBM DB2, "pl/sql" Oracle PL/SQL')
      .describe('o', 'Output file name. "-" - stdout');
let argv = command.argv;

if (argv.h) {
  command.showHelp();
  process.exit();
}

const supportedDialects = ['sql', 'n1ql', 'db2', 'pl/sql'];
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
