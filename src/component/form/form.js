import { useState, useRef } from 'react';
import './form.css';
import Keyboard from 'react-simple-keyboard';
import { Input } from 'antd';

/**
 * 带虚拟键盘的input表单
 *
 * @param {onConfirm} Function 点击确定触发的函数
 */
const FormKeyboard = (props) => {
  /**
   * 创建 inputKeyboard
   *
   * @param {inputKeyboard} ReactRef
   */
  const inputKeyboard = useRef(null);

  const { onConfirm, keyboardType = 'default', children, ...rest } = props;

  // 输入值
  const [value, setValue] = useState('');

  // 模拟键盘输入值
  const onChange = (value) => {
    setValue(value);
  };

  // 修改input值
  const onChangeInput = (event) => {
    setValue(event.target.value);
    inputKeyboard.current && inputKeyboard.current.setInput(event.target.value);
  };

  // 点击按钮
  const onKeyPress = (button) => {
    if (button === '{delete}') {
      // 删除value值
      setValue('');
      inputKeyboard.current && inputKeyboard.current.setInput('');
      return;
    }

    if (button === '{enter}') {
      // 触发确定
      onConfirm && onConfirm(value);
      return;
    }
  };

  const keyboardKeys =
    keyboardType === 'number'
      ? ['1 2 3 {bksp}', '4 5 6 {delete}', `[7 8 9 {empty} 0 .] {enter}`]
      : ['1 2 3 {bksp}', '4 5 6 {delete}', `[7 8 9 {empty} 0 {empty}] {enter}`];

  return (
    <div className="keyboard-box">
      <Input value={value} onChange={onChangeInput} {...rest} />
      {children}
      <div className="keyboard-border">
        <Keyboard
          keyboardRef={(r) => (inputKeyboard.current = r)}
          theme="hg-theme-default numeric-theme"
          layout={{
            default: keyboardKeys,
          }}
          display={{
            '{enter}': '确定',
            '{bksp}': '⌫',
            '{delete}': '清空',
            '{empty}': ' ',
          }}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};

export default FormKeyboard;
