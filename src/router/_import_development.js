module.exports = file => require('@/pages' + file).default
// module.exports = file => () => import('@/views' + file)