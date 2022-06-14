import type { AxiosError } from 'axios';
import { h } from 'vue';
import { useDialog } from '../utils/useDialog';
import { RequestConfigMap } from './interface';

export default (err: AxiosError) => {
  const { response, config } = err;
  if ((config as RequestConfigMap).$doException !== 'false') {
    let errContent = '';
    try {
      errContent = JSON.parse(response?.data.data)?.error;
    } catch (error) {
      errContent = response?.data.data;
    }
    const errMsg = h('div', [h('div', response?.data.title || err.message), h('div', errContent)]);
    errMsg;
    const { open } = useDialog();
    open({
      component: errMsg,
      options: { title: 'Error' },
    }).then((msg) => {
      // console.log('关闭弹窗触发', msg);
    });
  }
};
