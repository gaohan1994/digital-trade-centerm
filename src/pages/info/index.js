import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { changeNavTitle } from '../app';
import { useDispatch } from 'react-redux';
import Step1 from './step1';
import Step2 from './step2';
import Container from '../../component/container';

const steps = [
  { path: '/info/step1', Component: Step1, title: '输入户号', value: 1 },
  { path: '/info/step2', Component: Step2, title: '用户信息', value: 2 },
];

const InfoPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeNavTitle('客户信息查询'));
  }, []);

  /**
   * 当前步骤
   *
   * @param {currentStep} number
   */
  const [currentStep, setCurrentStep] = useState(1);

  /**
   * 用户户号
   *
   * @param {userCode} string
   */
  const [userCode, setUserCode] = useState();

  /**
   * 用户信息
   *
   * @param {userInfo} UserInfo
   */
  const [userInfo, setUserInfo] = useState();

  /**
   * 子页面设置值
   *
   * @param methodProps
   */
  const methodProps = {
    userCode,
    setUserCode,
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    if (window.location.href.includes('step1')) {
      setCurrentStep(1);
    }
    if (window.location.href.includes('step2')) {
      setCurrentStep(2);
    }
  }, [window.location.href]);

  return (
    <section className="page-bg">
      <Switch>
        {steps.map((item) => {
          const { path, Component } = item;
          return (
            <Route path={path} exact={true} key={path}>
              <Container
                currentStep={{ value: currentStep }}
                steps={steps}
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

export default InfoPage;
