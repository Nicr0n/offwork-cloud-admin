// 生产环境导入组件
module.exports = file => () => import('@/' + file + '.vue')
