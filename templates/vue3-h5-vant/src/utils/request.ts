/** 
 *  @author TalkTao
 * @description  接口封装
*/
import { useLoadingStore } from "@/store/loading";
import { useUserStoreWidthOut } from "@/store/user"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { cloneDeep } from 'lodash-es';
import { Result, RequestOptions, CreateAxiosOptions } from './types';
import { ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { useRouter } from 'vue-router';

declare type Recordable<T = any> = Record<string, T>;
const router = useRouter();

class HttpRequest {

    private axiosInstance: AxiosInstance;
    private options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        console.log(options)
        this.axiosInstance = axios.create(options);
        this.interceptors(this.axiosInstance);
    }

    interceptors(instance: AxiosInstance) {
        // 定义存放请求接口数组
        let requestList = [];
        const loadingStore = useLoadingStore();
        const setLoadingToFalse = response => {
            requestList
                .filter(item => item.url == response.config.url && item.method == response.config.method)
                .forEach(item => (item.isLoading = false));

            //所有请求都加载完才让加载提示消失
            if (requestList.every(item => !item.isLoading)) loadingStore.setLoading(false);
        };
        // 请求拦截器
        instance.interceptors.request.use(
            (config: any) => {
                // 不用判断请求loading的路由
                let ignoreLoadingUrls = ["/login"];
                if (!ignoreLoadingUrls.includes(config.url)) {
                    if (requestList.length < 10) {
                        requestList.unshift({ ...config, isLoading: true });
                    } else {
                        requestList = [...requestList.slice(0, 9), { ...config, isLoading: true }];
                    }
                    loadingStore.setLoading(true);
                }
                // 请求之前处理config
                const userStore = useUserStoreWidthOut();
                const token = userStore.getToken;
                // jwt token
                if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
                    // jwt token
                    (config as Recordable).headers.Authorization = this.options.authenticationScheme
                      ? `${this.options.authenticationScheme} ${token}`
                      : token;
                }
                return config;
            },
            error => Promise.reject(error + '请求错误')
        );
        // 响应拦截器
        instance.interceptors.response.use(
            response => {
                setLoadingToFalse(response);
                if(response.data.code === ResultEnum.ERROR){
                    // 重定向到登录
                    return router.replace({
                        path: '/login', query: { redirect: router.currentRoute.value.fullPath }
                    })
                }
                return response.data;
            },
            error => {
                if (error.response.status === 301) { }
                setLoadingToFalse(error);
                return Promise.reject(error.response?.data);
            }
        );
    }

    /**
     * @description: 处理响应数据
     */
    transformRequestData(res: AxiosResponse<Result>, options: RequestOptions){
        const { data } = res
        const {
            isTransformResponse
        } = options;

        if (!data) {
            // return '[HTTP] Request has no return value';
            throw new Error('请求出错，请稍候重试');
        }
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if(!isTransformResponse){
            return data
        }
        //  这里 code，result，message为 后台统一的字段，需要修改为项目自己的接口返回格式
        const { code, result, message } = data;
        // 接口请求成功，直接返回结果
        if (code === ResultEnum.SUCCESS) {
            return result;
        }
    }

    /**
    * @description:   请求方法
    */
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: AxiosRequestConfig = cloneDeep(config);

        const { requestOptions } = this.options;

        const opt: RequestOptions = Object.assign({}, requestOptions, options);

        // @ts-ignore
        conf.requestOptions = opt;

        return new Promise((resolve, reject) => {
            this.axiosInstance
            .request<any, AxiosResponse<Result>>(conf)
            .then((res: AxiosResponse<Result>) => {
                // 请求是否被取消
                const isCancel = axios.isCancel(res);
                if (!isCancel) {
                    try {
                        const ret = this.transformRequestData(res, opt);
                        resolve(ret);
                    } catch (err) {
                        reject(err || new Error('request error!'));
                    }
                    return;
                }
                resolve(res as unknown as Promise<T>);
            })
            .catch((e: Error) => {
                reject(e);
            });
        });
    }
}
const http = new HttpRequest({
    timeout: 10 * 1000,
    // jwttoken前缀
    authenticationScheme: '',
    baseURL: import.meta.env.VITE_BASE_URL as string,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 是否允许跨域携带token
    withCredentials: false,
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // 是否需要token
      withToken: true
    }
  });
export default http
