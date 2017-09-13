// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = ctx => ({
  parser: false,
  map: ctx.env === 'development' ? 'inline' : false,
  plugins: {
    cssnano: {
      safe: true // 避免 cssnano 重新计算 z-index
    },
    'postcss-import': {},
    'postcss-url': {},
    'postcss-cssnext': {}
    /*'postcss-pxtorem': {
      rootValue: 18,
      // px单位大写将忽略转化rem
      propList: ['!*'],
      selectorBlackList: [] // 忽略的选择器
    },*/
  }
})
