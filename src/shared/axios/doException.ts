import type { AxiosError } from 'axios';
import { useDialog } from '../utils/useDialog';
import { RequestConfigMap } from './interface';

export default (err: AxiosError) => {
  const { response, config } = err;
  if ((config as RequestConfigMap).$doException !== 'false') {
    const errMsg = response?.data.title || err.message;
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
