import { useEffect, useState } from '@lynx-js/react'
import './App.css'

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function CalculatorButton({ label, onClick, className = '' }: CalculatorButtonProps) {
  console.log('rendering button', label);
  return (
    <view className={`calculator-button ${className}`} bindtap={onClick}>
      <text>{label}</text>
    </view>
  );
}

export function App() {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    console.info('Hello, ReactLynx')
  }, [])

  const handleButtonClick = (value: string) => {
    switch (value) {
      case 'C':
        handleClear();
        break;
      case 'CE':
        setDisplay((prev) => prev.slice(0, -1));
        break;
      case '=':
        handleCalculate();
        break;
      case 'sqrt':
        setDisplay((prev) => Math.sqrt(parseFloat(prev)).toString());
        break;
      case 'pi':
        setDisplay((prev) => prev + Math.PI.toString());
        break;
      case 'exp':
        setDisplay((prev) => Math.exp(parseFloat(prev)).toString());
        break;
      case 'ln':
        setDisplay((prev) => Math.log(parseFloat(prev)).toString());
        break;
      case 'log':
        setDisplay((prev) => Math.log10(parseFloat(prev)).toString());
        break;
      case 'n!':
        setDisplay((prev) => {
          const num = parseInt(prev);
          const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
          return factorial(num).toString();
        });
        break;
      case '+-':
        setDisplay((prev) => (parseFloat(prev) * -1).toString());
        break;
      case 'x^2':
        setDisplay((prev) => Math.pow(parseFloat(prev), 2).toString());
        break;
      case '10^x':
        setDisplay((prev) => Math.pow(10, parseFloat(prev)).toString());
        break;
      case '1/x':
        setDisplay((prev) => (1 / parseFloat(prev)).toString());
        break;
      case 'mod':
        setDisplay((prev) => prev + '%');
        break;
      case 'x^y':
        setDisplay((prev) => prev + '^');
        break;
      default:
        setDisplay((prev) => prev + value);
        break;
    }
  }
  const handleClear = () => {
    setDisplay('')
  }

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString())
    } catch {
      setDisplay('Error')
    }
  }

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner'>
        </view>
        <view className='Content'>
          <view className='Calculator'>
            <view className='Display'>
              <text>{display}</text>
            </view>
            <view style={{ height: '5%' }}></view>
            <view className='Buttons'>
              {['sqrt', '(', ')', 'n!', 'CE', 'C', '/'].map((label) => (
                <CalculatorButton key={label} label={label} onClick={() => handleButtonClick(label)} />
              ))}
              {['2^nd', '1/x', 'x^y', '7', '8', '9', 'x'].map((label) => (
                <CalculatorButton key={label} label={label} onClick={() => handleButtonClick(label)} />
              ))}
              {['|x|', 'x^2', '10^x', '4', '5', '6', '-'].map((label) => (
                <CalculatorButton key={label} label={label} onClick={() => handleButtonClick(label)} />
              ))}
              {['mod', 'pi', 'log', '1', '2', '3', '+'].map((label) => (
                <CalculatorButton key={label} label={label} onClick={() => handleButtonClick(label)} />
              ))}
              {['e', 'exp', 'ln', '+-', '0', '.', '='].map((label) => (
                <CalculatorButton key={label} label={label} onClick={() => handleButtonClick(label)} />
              ))}
            </view>
          </view>
        </view>
      </view>
    </view>
  )
}