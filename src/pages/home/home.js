import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatSearch } from '../../service/service';
import icon1 from '../../assets/icon_home_prepayment.png';
import icon2 from '../../assets/icon_home_payment.png';
import icon3 from '../../assets/icon_home_flow.png';
import { Modal } from 'antd';
import './index.css';
import FormKeyboard from '../../component/form/form';

const homeItems = [
  {
    img: icon1,
    title: '电费充值',
    url: '/pay/step1',
  },
  {
    img: icon2,
    title: '欠费补缴',
    url: '/owe/step1',
  },
  {
    img: icon3,
    title: '客户基本信息查询',
    url: '/info/step1',
  },
];

const HomeCard = (props) => {
  const { img, title, onClick } = props;

  return (
    <section className="home-card" onClick={() => onClick(props)}>
      <div
        className="home-card-img"
        style={{ backgroundImage: `url(${img})` }}
      />
      <h3>{title}</h3>
    </section>
  );
};

const HomePage = () => {
  const history = useHistory();

  /**
   * @param visible
   *  */
  const [visible, setVisible] = useState(false);

  const onConfirm = () => {
    history.push('/info/step1');
    setVisible(false);
  };

  useEffect(() => {
    if (history) {
      const params = formatSearch(history.location.search);
    }
  }, [history]);

  const onClickHandle = (item) => {
    history.push(item.url);
  };

  return (
    <div className="home-bg">
      <section className="home-bar">
        <div className="home-bar-logo" />
        <div className="home-bar-quit" />
      </section>
      <div className="home-main">
        {homeItems.map((item) => (
          <HomeCard key={item.url} onClick={onClickHandle} {...item} />
        ))}
      </div>

      <Modal
        closable={false}
        width={'77vw'}
        visible={visible}
        footer={null}
        closeIcon={null}
        title={
          <div className="keyboard-modal-title">
            管理员密码
            <div className="keyboard-modal-close" />
          </div>
        }
      >
        <FormKeyboard
          placeholder="请输入管理员密码"
          style={{ backgroundColor: '#f2f2f2' }}
          onConfirm={onConfirm}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
