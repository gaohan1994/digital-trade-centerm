import '../pay/index.css';
import bgsuccess from '../../assets/icon_paymengt_success.png';
import bgfail from '../../assets/icon_paymengt_fail.png';
import GhButton from '../../component/button';
import { useEffect } from 'react';
import { AcqCode, fetchOwPayNotice } from '../../service/api';
import numeral from 'numeral';
import { useHistory } from 'react-router-dom';

const PayStep4 = (props) => {
  const history = useHistory();
  const {
    userInfo,
    userPayInfo,
    userPayAmount = 0,
    payResult = { status: 'success' },
  } = props;
  /**
   * 调用通知结果接口
   *
   * @method useEffect
   */
  useEffect(() => {
    notice();
  }, []);

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
      rcvbl_info_list: userInfo.rcvblInfoList.map((item) => {
        return {
          cost_id: item.onlyCostId,
          ow_amt: numeral(item.owAmt).format('0.00'),
          dflt_pny: numeral(item.dfltPny).format('0.00'),
        };
      }),
    };
    // const params = {
    //   acq_code: AcqCode,
    //   usr_id: '3206622491320',
    //   order_no: 'RITZDQGKT1626747089220',
    //   rcvbl_info_list: [
    //     {
    //       cost_id: '3221032400025208',
    //       ow_amt: '6.00',
    //       dflt_pny: '0.00',
    //     },
    //   ],
    // };
    await fetchOwPayNotice(params);
  };

  const backToTop = () => {
    history.replace('/');
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
