import React from 'react';
// import {Toast} from 'antd'
import { useHistory } from 'react-router-dom';
import FormKeyboard from '../../component/form/form';
import { Toast } from 'antd-mobile';
import { fetchUserInfo, ResponseCode, AcqCode } from '../../service/api';

const PayStep1 = (props) => {
  const { setUserCode, setUserInfo } = props;

  const history = useHistory();

  /**
   * 输入完户号的回调
   */
  const onSubmit = async (value) => {
    if (value === '') {
      // Toast.info('该户号不存在，请重新输入！');
      Toast.info('请输入您的户号');
      return;
    }

    const params = {
      usr_id: value,
      acq_code: AcqCode,
    };

    Toast.loading('加载中');
    const result = await fetchUserInfo(params);
    console.log('result: ', result);
    Toast.hide();

    if (result.response.code !== ResponseCode.success) {
      Toast.info(result.response.msg || '请输入您的户号');
      return;
    }

    if (result.response.sub_code !== ResponseCode.sub_success_code) {
      Toast.info(result.response.sub_msg || '请输入正确的户号');
      return;
    }

    setUserCode(value);
    /**
     * 传入用户数据
     *
     * @param {result.response.data} UserInfo
     */
    setUserInfo(JSON.parse(result.response.data));
    history.push(`/pay/step2`);
  };

  return (
    <>
      <FormKeyboard placeholder="请输入您的户号" onConfirm={onSubmit} />
    </>
  );
};

export default PayStep1;
