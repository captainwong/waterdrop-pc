import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
import GET_OSS_INFO from '@/graphql/oss';

interface OSSDataType {
  code: number;
  message: string;
  data: {
    dir: string;
    expire: string;
    host: string;
    accessId: string;
    policy: string;
    signature: string;
  };
}

interface OSSUploadProps {
  value?: UploadFile[];
  label?: string;
  maxCount?: number;
  imgCropAspect?: number;
  onChange?: (fileList: UploadFile[]) => void;
}

const OssImgUploader = ({
  value,
  label,
  maxCount,
  imgCropAspect,
  onChange,
}: OSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);
  const OSSData = data?.getOSSInfo.data;
  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const key = `${OSSData?.dir}${file.uid}${suffix}`;
    const url = `${OSSData?.host}/${key}`;
    return { key, url };
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map((file) => ({
      ...file,
      url: file.url || getKey(file).url,
    }));
    onChange?.(files);
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: getKey(file).key,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;
    const expire = Number(OSSData.expire) * 1000;
    if (expire < Date.now()) {
      await refetch();
    }
    return file;
  };

  return (
    <ImgCrop rotationSlider aspect={imgCropAspect}>
      <Upload
        name="file"
        maxCount={maxCount}
        listType="picture-card"
        fileList={value}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        {label}
      </Upload>
    </ImgCrop>
  );
};

OssImgUploader.defaultProps = {
  value: null,
  label: 'Upload',
  maxCount: 1,
  imgCropAspect: 1,
  onChange: () => {},
};

export default OssImgUploader;
