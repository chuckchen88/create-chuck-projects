import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import { viteMockServe } from 'vite-plugin-mock';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 检查process.cwd()路径下.env.develeport.local、.env.development、.env.local、.env这四个环境文件
	loadEnv(mode, process.cwd());
	return {

		// 静态资源基础路径 base: './' || '',
		base: '',

		resolve: {
			alias: {
				// 配置src目录
				"@": path.resolve(__dirname, "src"),
				// 导入其他目录
				"components": path.resolve(__dirname, "components")
			}
		},
		plugins: [
			vue(),
			Components({
				resolvers: [VantResolver()],
			}),
			viteMockServe({
				mockPath: './mock',
				supportTs: true,
				localEnabled: false
			})
		],

		// 跨域代理
		server: {
			host: '0.0.0.0',
			proxy: {
				'/api': {
					target: 'https://api.inews.qq.com',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '') // 将匹配到的api替换成''
				}
			}
		}
	};
});
