module.exports = ctx => {
  return {
    plugins: [
      require('postcss-import')({
        path: [ctx.cwd + '/src']
      }),
      require('postcss-nested')(ctx.plugin),
      require('postcss-cssnext')(ctx.plugin),
      require('postcss-color-function')(ctx.plugin),
      require('postcss-media-minmax')(ctx.plugin),
      require('rucksack-css')(ctx.plugin)
    ]
  }
}
