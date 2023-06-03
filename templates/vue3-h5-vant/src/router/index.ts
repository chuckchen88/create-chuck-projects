import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routeMap from "./routeMap";

// 通过Vite的import.meta.glob()方法实现自动化导入路由
const mainRouterModules = import.meta.glob('../layout/*.vue')
const viewRouterModules = import.meta.glob('../views/**/*.vue')

// 子路由
const childRoutes = Object.keys(viewRouterModules).map((path)=>{	
	let urlPath = path.match(/\.\.\/views\/(.*)\.vue$/)[1].toLowerCase();
	return {
		path: routeMap[urlPath] && routeMap[urlPath]['path'] || urlPath,
		name: urlPath.replace(/\/(\w)/g, function($0, $1){
			return $1.toUpperCase()
		}),
		component: viewRouterModules[path],
		meta: routeMap[urlPath] && routeMap[urlPath]['meta'] || undefined
	}
}).filter(item => item.path.indexOf('components') < 0)  // 过滤掉views里的局部components

// 根路由
const rootRoutes = Object.keys(mainRouterModules).map((path) => {
    const name = path.match(/\.\.\/layout\/(.*)\.vue$/)[1].toLowerCase();
    const routePath = `/${name}`;
    if (routePath === '/index') {
		return {
			path: '/',
			name,
			redirect: '/home/home',
			component: mainRouterModules[path],
			children: childRoutes
		};
    }
})
console.log(rootRoutes)
const routes: Array<RouteRecordRaw> = rootRoutes

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router







