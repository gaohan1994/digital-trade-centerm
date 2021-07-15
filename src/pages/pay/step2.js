import FormInfo from '../../component/form/info';
import GhButton from '../../component/button';
import { useHistory } from 'react-router-dom';

const Step2 = (props) => {
  const { userInfo } = props;

  const history = useHistory();
  const onClick = () => {
    history.push('/pay/step3');
  };

  // adr: "学府花苑一000002号车库"
  // crtTm: 1626233680000
  // mod: "03"
  // payId: "01"
  // usrAccNm: "0康"
  // usrBlngUnit: "3240501"
  // usrBlngUnitNm: "苏州供电公司姑苏区"
  // usrId: "3206623086412"
  // wthrAlrdyCnclAcct: "1"
  // wthrFeeUsr: "0"

  const items = [
    { title: '用户编号', value: userInfo.usrId },
    { title: '用户所属单位', value: userInfo.usrBlngUnitNm },
    { title: '用电户名', value: userInfo.usrAccNm },
    { title: '用电地址', value: userInfo.adr },
    // { title: '是否销户', value: userInfo.wthrAlrdyCnclAcct  },
    // { title: '交易金额', value: '￥100' },
    // { title: '订单号', value: '123456' },
    // { title: '交易时间', value: '20202020202020' },
    // { title: '卡号', value: '6110021994042520211' },
    // { title: '流水号', value: '000041' },
    // { title: '参考号', value: '00005149994' },
  ];
  return (
    <>
      <FormInfo forms={items} />
      <GhButton onClick={onClick}>确定</GhButton>
    </>
  );
};

export default Step2;
