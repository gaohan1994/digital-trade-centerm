import './index.css';
import numeral from 'numeral';
import QRCode from 'qrcode.react';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { MerchantId, AcqCode, fetchQuery } from '../../service/api';

const PayStep3 = (props) => {
  const history = useHistory();
  const timerRef = useRef();

  const { userPayAmount, userPayInfo, setPayResult } = props;

  const fetchPayResult = async () => {
    const params = {
      merchant_id: MerchantId,
      acq_code: AcqCode,
      pre_order_no: userPayInfo.order_no,
    };

    const result = await fetchQuery(params);

    if (result.response.status === 'SUCCESS') {
      setPayResult(result.response);
      history.push('/pay/step5');
      return;
    }

    if (result.response.status === 'PAYERROR') {
      setPayResult(result.response);
      history.push('/pay/step5');
      return;
    }
  };

  /**
   * 建立定时器
   *
   * @method useEffect
   */
  useEffect(() => {
    /**
     * 创建的定时器id timerId
     * 每 n 秒请求一次支付结果
     *
     * @param fetchPayResult
     */
    const timerId = setInterval(() => {
      fetchPayResult();
    }, 5 * 1000);

    timerRef.current = timerId;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="pay-step-box">
      <h1>￥{numeral(userPayAmount).format('0.00')}</h1>
      <div className="pay-qrcode">
        <QRCode width={260} height={260} value={userPayInfo.pay_url} />
      </div>
      <span className="pay-tip">请使用手机端APP扫描上方二维码</span>
    </div>
  );
};

export default PayStep3;
