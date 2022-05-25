import type { AxiosRequestConfig } from 'axios';

export interface RequestConfigMap extends AxiosRequestConfig {
  $doException?: 'true' | 'false'; // 默认处理报错弹窗
}
