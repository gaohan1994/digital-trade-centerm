/**
 * 盒组件
 * @Author: centerm.gaohan
 * @Date: 2021-07-12 10:05:51
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-07-13 15:39:01
 */
import './index.css';

const Container = (props) => {
  /**
   * props
   *
   * @param {steps} Array<Step> 所有的步骤
   *
   * @param {selectedSteps} Array<Step> 选中的步骤
   *
   * @param {currentStep} Step 当前步骤
   */
  const { selectedSteps, steps, currentStep } = props;

  return (
    <section className="container">
      <div className="container-box">
        {!!steps && (
          <div className="steps">
            {steps.map((item, index) => {
              /**
               * @param title step标题
               *
               * @param value step的值
               *
               * @param itemSelected 当前步骤是否选中
               *
               */
              const { title, value } = item;

              let itemSelected = false;

              let itemIsCurrent = false;

              if (
                selectedSteps &&
                selectedSteps.some((step) => step.value === value)
              ) {
                // 遍历 是否完成状态
                itemSelected = true;
              }

              if (item.value < currentStep.value) {
                // 如果步骤小于当前步骤则必定成功
                itemSelected = true;
              }

              if (currentStep && currentStep.value === value) {
                // 说明显示的是当前步骤
                itemIsCurrent = true;
              }
              return (
                <div key={value} className="step">
                  <span
                    className="step-title"
                    data-selected={
                      itemIsCurrent || itemSelected ? 'selected' : 'normal'
                    }
                  >
                    {title}
                  </span>
                  <div
                    className="step-img"
                    img-status={
                      itemIsCurrent
                        ? 'current'
                        : itemSelected
                        ? 'complete'
                        : 'normal'
                    }
                  >
                    {!itemSelected && <span>{index + 1}</span>}
                  </div>
                </div>
              );
            })}

            <div
              className="steps-line"
              style={{ width: steps.length > 2 ? '80%' : '50%' }}
            />
          </div>
        )}
        {props.children}
      </div>
    </section>
  );
};

export default Container;
