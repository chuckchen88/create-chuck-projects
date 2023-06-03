import http from '@/utils/request'

export const getList = (params: any) => {
	return http.request({
		url: '/common/code/logisticsInfo/getLogisticsByOrderId',
		method: 'get',
	});
}
