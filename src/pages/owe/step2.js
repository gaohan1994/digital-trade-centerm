import React, { useState, useEffect } from 'react';
import FormKeyboard from '../../component/form/form';
import {
  AcqCode,
  fetchTradeUnified,
  MerchantId,
  ResponseCode,
} from '../../service/api';
import { useHistory } from 'react-router-dom';
import GhButton from '../../component/button';
import numeral from 'numeral';
import { Modal } from 'antd';
import FormInfo from '../../component/form/info';
import { getRandomString } from '../../service/service';
import { Toast } from 'antd-mobile';

const Step2 = (props) => {
  const { userInfo, setUserPayAmount, setUserPayInfo } = props;
  const history = useHistory();

  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState(false);

  const onSubmit = async (value) => {
    if (price === 0) {
      Toast.show('您没有欠费信息');
      return;
    }

    const orderNo = getRandomString().toUpperCase() + `${new Date().getTime()}`;

    const params = {
      merchant_id: MerchantId,
      acq_code: AcqCode,
      usr_id: userInfo.usrId,
      order_no: orderNo,
      fee_mod: '0',
      trade_at: numeral(price).format('0.00'),
      rcvbl_info_list: userInfo.rcvblInfoList.map((item) => {
        return {
          cost_id: item.onlyCostId,
          ow_amt: numeral(item.owAmt).format('0.00'),
          dflt_pny: numeral(item.dfltPny).format('0.00'),
        };
      }),
    };

    Toast.loading('请稍候');
    const result = await fetchTradeUnified(params);
    console.log('result: ', result);
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
     * 设置扫码链接信息
     *
     * @param setUserPayInfo
     */
    setUserPayInfo(result.response);

    history.push('/owe/step4');
  };

  useEffect(() => {
    let owePrice = 0;

    if (userInfo.rcvblInfoList && userInfo.rcvblInfoList.length > 0) {
      for (let i = 0; i < userInfo.rcvblInfoList.length; i++) {
        /**
         * 欠费金额加上 这个月的欠费金额
         * 欠费金额加上 这个月的违约金
         */
        owePrice += numeral(userInfo.rcvblInfoList[i].owAmt).value();
        owePrice += numeral(userInfo.rcvblInfoList[i].dfltPny).value();
      }
    }
    setPrice(owePrice);
    setUserPayAmount(owePrice);
  }, []);

  const items = [
    { title: '用户编号', value: userInfo.usrId },
    { title: '用户所属单位', value: userInfo.usrBlngUnitNm },
    { title: '用电户名', value: userInfo.usrAccNm },
    { title: '用电地址', value: userInfo.adr },
    { title: '欠费金额', value: `￥${numeral(price).format('0.00')}` },
    {
      title: '欠费详情',
      value: (
        <span className="owe-tip" onClick={() => setVisible(true)}>
          欠费详情
        </span>
      ),
    },
  ];

  return (
    <div className="pay-step-box">
      <FormInfo forms={items} />
      {/* <span className="pay-tip">待缴金额</span>
      <h1>￥100</h1> */}

      <GhButton onClick={onSubmit}>确定</GhButton>

      <Modal
        closable={false}
        width={'85vw'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        closeIcon={null}
        title={null}
        centered={true}
      >
        <div className="owe-form">
          <div className="owe-item">
            <span>欠费日期</span>
            <span>欠费金额(元)</span>
            <span>违约金(元)</span>
          </div>

          {userInfo.rcvblInfoList &&
            userInfo.rcvblInfoList.map((item) => {
              return (
                <div className="owe-item" key={item.costYrMo}>
                  <span>{item.costYrMo || ' '}</span>
                  <span>{numeral(item.owAmt).format('0.00') || '0.00'}</span>
                  <span>{numeral(item.dfltPny).format('0.00') || '0.00'}</span>
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
};

export default Step2;
