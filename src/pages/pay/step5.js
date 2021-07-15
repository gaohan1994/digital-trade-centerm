import './index.css';
import bgsuccess from '../../assets/icon_paymengt_success.png';
import bgfail from '../../assets/icon_paymengt_fail.png';
import GhButton from '../../component/button';
import numeral from 'numeral';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRechargePayNotice, AcqCode } from '../../service/api';

const PayStep4 = (props) => {
  const history = useHistory();
  const { userInfo, userPayInfo, payResult, userPayAmount } = props;

  /**
   * 调用通知结果接口
   *
   * @method useEffect
   */
  useEffect(() => {
    notice();
  }, []);

  const backToTop = () => {
    history.replace('/');
  };

  const notice = async () => {
    /**
     * 查询缴费报文
     *
     * @param params
     */
    const params = {
      acq_code: AcqCode,
      usr_id: userInfo.usrId,
      order_no: userPayInfo.order_no,
      trade_at: userPayAmount,
    };
    await fetchRechargePayNotice(params);
  };

  if (payResult.status === 'SUCCESS') {
    return (
      <div className="pay-step-box">
        <div
          className="pay-result"
          style={{ backgroundImage: `url(${bgsuccess})` }}
        />
        <span className="pay-tip">缴费成功！</span>
        <h1>￥{numeral(userPayAmount).format('0.00')}</h1>

        <GhButton onClick={backToTop}>确定</GhButton>
      </div>
    );
  }
  return (
    <div className="pay-step-box">
      <div
        className="pay-result"
        style={{ backgroundImage: `url(${bgfail})` }}
      />
      <span className="pay-tip" type="fail">
        缴费失败！
      </span>

      <GhButton type="warn" onClick={backToTop}>
        确定
      </GhButton>
    </div>
  );
};

export default PayStep4;
