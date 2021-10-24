import { useState, useCallback, useEffect, useRef } from 'react'
import { BlockWithLabel } from "./Block";
import classes from '../styles/block-amount.module.css';
import {currencyFormat} from "../utils";

function isButtonsMode(mode) {
  return mode === 'buttons';
}

function isInputsMode(mode) {
  return mode === 'inputs';
}

function getActionText(mode) {
  if (isButtonsMode(mode)) return 'Другая сумма';
  if (isInputsMode(mode)) return 'Номиналы';

  throw new Error(`Unknown mode`);
}

function isButtonActive(currentValue, buttonValue) {
  return currentValue === buttonValue;
}

function generateButtonCN(currentValue, buttonValue) {
  let result = `${classes.button}`;

  if (isButtonActive(currentValue, buttonValue)) result += ` ${classes['button-active']}`;

  return result;
}

function generateInputHintText() {
  return `Введите сумму от ${currencyFormat(process.env.MIN_TIP_AMOUNT, { withoutSign: true })} до ${currencyFormat(process.env.MAX_TIP_AMOUNT)}.`
}

const BlockAmount = ({ value, onChange, blockLabel = 'Сумма', className }) => {
  const [mode, setMode] = useState('buttons');
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(value)

  const setAmount = useCallback(amount => () => {
    onChange(amount)
    setInputValue(amount)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(prevMode => prevMode === 'buttons' ? 'inputs' : 'buttons')
  }, [])

  const onBlurInput = () => {
    const currentInputValue = +inputValue;
    let newValue = currentInputValue;

    if (Number.isNaN(currentInputValue) || currentInputValue < +process.env.MIN_TIP_AMOUNT) {
      newValue = +process.env.MIN_TIP_AMOUNT;
    }

    if (currentInputValue > +process.env.MAX_TIP_AMOUNT) {
      newValue = +process.env.MAX_TIP_AMOUNT
    }

    onChange(newValue)
    setInputValue(newValue)
  }

  const onInput = ({ target }) => {
    setInputValue(target.value);
  }

  useEffect(() => {
    if (isInputsMode(mode) && inputRef) {
      inputRef.current.focus();
    }
  }, [mode, inputRef])

  return (
    <BlockWithLabel label={blockLabel}
                    className={className}
                    actionText={getActionText(mode)}
                    onClickAction={toggleMode}
    >
      {isButtonsMode(mode) && (
        <div className={classes.buttons}>
          <button className={generateButtonCN(value, 100)} onClick={setAmount(100)}>100</button>
          <button className={generateButtonCN(value, 150)} onClick={setAmount(150)}>150</button>
          <button className={generateButtonCN(value, 200)} onClick={setAmount(200)}>200</button>
          <button className={generateButtonCN(value, 500)} onClick={setAmount(500)}>500</button>
          <button className={generateButtonCN(value, 1000)} onClick={setAmount(1000)}>1000</button>
        </div>
      )}
      {isInputsMode(mode) && (
        <div>
          <input className={classes.input} inputMode="numeric" ref={inputRef} value={inputValue} onChange={onInput} onBlur={onBlurInput} />
          <div className={classes['input__hint']}>{generateInputHintText()}</div>
        </div>
      )}
    </BlockWithLabel>
  )
}

export default BlockAmount