import React from 'react';
import { useHistory } from 'react-router-dom';
import FormKeyboard from '../../component/form/form';
import { Toast } from 'antd-mobile';
import { ResponseCode, AcqCode, fetchOwInfoQuery } from '../../service/api';

const Step1 = (props) => {
  const { setUserInfo } = props;

  const history = useHistory();

  /**
   * 输入完户号的回调
   *
   * 320600113560
   * 3206100113560
   * 3206100112595
   * 3206100112581
   * 3206100113532
   * 3206100419507
   * 3206100419750
   * 3206100419286
   * 3206100419222
   * 3206100113571
   * 3206100114534
   * 3206100114526
   * 3206100224570
   * 3206100419381
   * 3206100419635
   */
  const onSubmit = async (value) => {
    if (value === '') {
      Toast.info('请输入您的户号');
      return;
    }

    const params = {
      usr_id: value,
      acq_code: AcqCode,
    };

    // const data = [
    //   '3206100113560',
    //   '3206100112595',
    //   '3206100112581',
    //   '3206100113532',
    //   '3206100419507',
    //   '3206100419750',
    //   '3206100419286',
    //   '3206100419222',
    //   '3206100113571',
    //   '3206100114534',
    //   '3206100114526',
    //   '3206100224570',
    //   '3206100419381',
    //   '3206100419635',
    // ];

    // data.forEach((item) => {
    //   const itemparam = {
    //     usr_id: item,
    //     acq_code: AcqCode,
    //   };
    //   fetchOwInfoQuery(itemparam).then((result) => {
    //     console.log('item result', result);
    //   });
    // });

    Toast.loading('加载中');
    const result = await fetchOwInfoQuery(params);
    Toast.hide();

    if (result.response.code !== ResponseCode.success) {
      Toast.info(result.response.msg || '请输入您的户号');
      return;
    }

    if (result.response.sub_code !== ResponseCode.sub_success_code) {
      Toast.info(result.response.sub_msg || '请输入正确的户号');
      return;
    }

    /**
     * 传入用户数据
     *
     * @param {result.response.data} UserInfo
     */
    console.log(
      'JSON.parse(result.response.data):',
      JSON.parse(result.response.data)
    );
    setUserInfo(JSON.parse(result.response.data));
    history.push(`/owe/step2`);
  };

  return (
    <>
      <FormKeyboard placeholder="请输入您的户号" onConfirm={onSubmit} />
    </>
  );
};

export default Step1;
