import React from 'react';
import FormKeyboard from '../../component/form/form';
import {
  AcqCode,
  MerchantId,
  fetchTradeUnified,
  ResponseCode,
} from '../../service/api';
import numeral from 'numeral';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { getRandomString } from '../../service/service';

const PayStep2 = (props) => {
  const { userInfo, setUserPayAmount, setUserPayInfo } = props;
  const history = useHistory();

  const onSubmit = async (price) => {
    const value = numeral(price).value();
    if (value < 5) {
      Toast.show('充值金额最少5元');
      return;
    }

    const orderNo = getRandomString().toUpperCase() + `${new Date().getTime()}`;

    const params = {
      merchant_id: MerchantId,
      acq_code: AcqCode,
      usr_id: userInfo.usrId,
      order_no: orderNo,
      fee_mod: 1,
      trade_at: numeral(value).format('0.00'),
    };

    Toast.loading('请稍候');
    const result = await fetchTradeUnified(params);
    Toast.hide();

    if (result.response.code !== ResponseCode.success) {
      Toast.info(result.response.msg || '系统出错');
      return;
    }

    if (result.response.sub_code !== ResponseCode.sub_success_code) {
      Toast.info(result.response.sub_msg || '支付失败');
      return;
    }

    /**
     * 设置充值金额
     * 设置扫码链接信息
     *
     * @param setUserPayAmount
     * @param setUserPayInfo
     */
    setUserPayAmount(value);
    setUserPayInfo(result.response);
    history.push('/pay/step4');
  };

  return (
    <>
      <FormKeyboard
        placeholder="请输入充值金额"
        keyboardType="number"
        onConfirm={onSubmit}
      />
    </>
  );
};

export default PayStep2;
