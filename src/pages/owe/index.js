import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PayStep1 from './step1';
import PayStep2 from './step2';
import PayStep4 from './step4';
import PayStep5 from './step5';
import Container from '../../component/container';
import { useDispatch } from 'react-redux';
import { changeNavTitle } from '../app';

const paySteps = [
  { path: '/owe/step1', Component: PayStep1, title: '输入户号', value: 1 },
  { path: '/owe/step2', Component: PayStep2, title: '信息确认', value: 2 },
  { path: '/owe/step4', Component: PayStep4, title: '扫码支付', value: 4 },
  { path: '/owe/step5', Component: PayStep5, title: '缴费成功', value: 5 },
];

const OwePage = () => {
  const dispatch = useDispatch();
  /**
   * 当前步骤
   *
   * @param {currentStep} number
   */
  const [currentStep, setCurrentStep] = useState(1);

  /**
   * 用户信息
   *
   * @param {userInfo} UserInfo
   */
  const [userInfo, setUserInfo] = useState();

  /**
   * 用户缴费信息
   *
   * @param {userPayInfo} string
   */
  const [userPayInfo, setUserPayInfo] = useState();

  /**
   * 支付结果
   *
   * @param {payResult} string
   */
  const [payResult, setPayResult] = useState();

  /**
   * 用户缴费金额
   *
   * @param {userPayAmount} string
   */
  const [userPayAmount, setUserPayAmount] = useState();

  useEffect(() => {
    dispatch(changeNavTitle('欠费补缴'));
  }, []);

  useEffect(() => {
    if (window.location.href.includes('step1')) {
      setCurrentStep(1);
    }
    if (window.location.href.includes('step2')) {
      setCurrentStep(2);
    }
    if (window.location.href.includes('step4')) {
      setCurrentStep(4);
    }
    if (window.location.href.includes('step5')) {
      setCurrentStep(5);
    }
  }, [window.location.href]);

  /**
   * 子页面设置值
   *
   * @param methodProps
   *
   * @param userInfo 用户信息
   * @param setUserInfo 设置用户信息
   */
  const methodProps = {
    userInfo,
    setUserInfo,
    userPayInfo,
    setUserPayInfo,
    payResult,
    setPayResult,
    userPayAmount,
    setUserPayAmount,
  };

  return (
    <section className="page-bg">
      <Switch>
        {paySteps.map((item) => {
          const { path, Component } = item;
          return (
            <Route path={path} exact={true} key={path}>
              <Container
                currentStep={{ value: currentStep }}
                steps={paySteps}
                selectedSteps={[]}
              >
                <Component {...methodProps} />
              </Container>
            </Route>
          );
        })}
      </Switch>
    </section>
  );
};

export default OwePage;
