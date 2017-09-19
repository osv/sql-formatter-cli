#!/bin/sh

echo '#!/usr/bin/env node' > dist/sql-formatter-cli
cat dist/sql-formatter-cli.js >> dist/sql-formatter-cli
rm  dist/sql-formatter-cli.js
