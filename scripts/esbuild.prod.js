const define = {
  global: 'window'
}

console.log('esbuild bundling')

require('esbuild')
  .build({
    entryPoints: ['./frontend/index.jsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: 'public/dist/bundle.js',
    target: ['chrome87', 'firefox89', 'safari13', 'edge91'],
    plugins: [],
    define
  })
  .catch(() => process.exit(1))
