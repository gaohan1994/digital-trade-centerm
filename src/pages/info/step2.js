import FormInfo from '../../component/form/info';
import GhButton from '../../component/button';
import { useHistory } from 'react-router-dom';

const Step2 = (props) => {
  const history = useHistory();
  const { userInfo } = props;
  const items = [
    { title: '用户编号', value: userInfo.usrId },
    { title: '用户所属单位', value: userInfo.usrBlngUnitNm },
    { title: '用电户名', value: userInfo.usrAccNm },
    { title: '用电地址', value: userInfo.adr },
  ];
  return (
    <>
      <FormInfo forms={items} />
      <GhButton
        onClick={() => {
          history.replace('/');
        }}
      >
        确定
      </GhButton>
    </>
  );
};

export default Step2;
