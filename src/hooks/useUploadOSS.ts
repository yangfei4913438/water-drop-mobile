import { useQuery } from '@apollo/client';
import { getOSSInfo, OSSInfoType } from '@/graphql/oss';

const useUploadOSS = <T>() => {
  // 获取签名信息
  const { data } = useQuery<{ ossInfo: OSSInfoType }>(getOSSInfo);

  // 上传数据
  const uploadHandler = async (file: File) => {
    if (!data) return {} as T;
    const formData = new FormData();
    const { ossInfo } = data;
    const key = `${ossInfo.dir}${file.name}`;
    formData.append('key', key);
    formData.append('policy', ossInfo.policy);
    formData.append('OSSAccessKeyId', ossInfo.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', ossInfo.signature);
    formData.append('file', file);
    const res = await fetch(ossInfo.host, { method: 'post', body: formData });
    // console.log('res:', res);
    const url = res.url + key;
    // console.log('url:', url);
    return { url } as T;
  };

  return {
    uploadHandler,
  };
};

export default useUploadOSS;
