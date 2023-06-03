import { apiUrl } from '@/const/api';
import http from '@/utils/request';

export const getTest = (params?: any) => {
	return http.request({
		url: '/api/newsqa/v1/query/inner/publish/modules/list',
		method: 'get',
		params
	},
    {
      isTransformResponse: true,
    });
};
