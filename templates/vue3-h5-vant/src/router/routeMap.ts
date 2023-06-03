export default {
    'channel/detail': {
        path: 'goods/detail/:id', //自定义路由
        meta: {
            keepAlive: false, // 需要缓存 默认false
            hideTabBar: true, // 不显示底部tabBar 默认false
        }
    },
}