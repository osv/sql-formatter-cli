import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import clean from 'rollup-plugin-clean';

import uglify from 'rollup-plugin-uglify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

const prod = process.env.BUILD == 'production';

let plugins = [
  clean(),
  resolve({
    jsnext: true,
    main: true
  }),
  commonjs(),
  babel(babelrc())
];

if (prod) {
  plugins.push(uglify())
}

export default {
  entry: 'index.js',
  plugins: plugins,
  targets: [
    {
      dest: pkg.bin + '.js',
      format: 'cjs',
      sourceMap: !prod
    }
  ],
  external: [
    'path',
    'fs'
  ]
};
