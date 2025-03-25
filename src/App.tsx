"use client"

import { useEffect, useState } from "@lynx-js/react"
import "./App.css"

interface CalculatorButtonProps {
  label: string
  onClick: () => void
  className?: string
  type?: "number" | "operation" | "function" | "equals"
}

export function CalculatorButton({ label, onClick, className = "", type = "operation" }: CalculatorButtonProps) {
  return (
    <view className={`calculator-button ${type}-button ${className}`} bindtap={onClick}>
      <text>{label}</text>
    </view>
  )
}

export function App() {
  const [display, setDisplay] = useState("")
  const [history, setHistory] = useState("")

  useEffect(() => {
    console.info("Hello, ReactLynx")
  }, [])

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "C":
        handleClear()
        break
      case "CE":
        setDisplay("")
        break
      case "=":
        handleCalculate()
        break
      case "sqrt":
        setDisplay((prev) => Math.sqrt(Number.parseFloat(prev)).toString())
        setHistory(`sqrt(${display})`)
        break
      case "pi":
        setDisplay((prev) => prev + Math.PI.toString())
        break
      case "exp":
        setDisplay((prev) => Math.exp(Number.parseFloat(prev)).toString())
        setHistory(`exp(${display})`)
        break
      case "ln":
        setDisplay((prev) => Math.log(Number.parseFloat(prev)).toString())
        setHistory(`ln(${display})`)
        break
      case "log":
        setDisplay((prev) => Math.log10(Number.parseFloat(prev)).toString())
        setHistory(`log(${display})`)
        break
      case "n!":
        setDisplay((prev) => {
          const num = Number.parseInt(prev)
          const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
          return factorial(num).toString()
        })
        setHistory(`${display}!`)
        break
      case "+-":
        setDisplay((prev) => (Number.parseFloat(prev) * -1).toString())
        break
      case "x^2":
        setDisplay((prev) => Math.pow(Number.parseFloat(prev), 2).toString())
        setHistory(`${display}²`)
        break
      case "10^x":
        setDisplay((prev) => Math.pow(10, Number.parseFloat(prev)).toString())
        setHistory(`10^${display}`)
        break
      case "1/x":
        setDisplay((prev) => (1 / Number.parseFloat(prev)).toString())
        setHistory(`1/${display}`)
        break
      case "mod":
        setDisplay((prev) => prev + "%")
        break
      case "x^y":
        setDisplay((prev) => prev + "^")
        break
      case "|x|":
        setDisplay((prev) => Math.abs(Number.parseFloat(prev)).toString())
        setHistory(`|${display}|`)
        break
      case "e":
        setDisplay((prev) => prev + Math.E.toString())
        break
      // case "+":
      //   setDisplay((prev) => prev + "+")
      //   break
      // case "-":
      //   setDisplay((prev) => prev + "-")
      //   break
      // case "x":
      //   setDisplay((prev) => prev + "*")
      //   break
      // case "/":
      //   setDisplay((prev) => prev + "/")
      //   break
      default:
        setDisplay((prev) => prev + value);
        break
    }
  }

  const handleClear = () => {
    setDisplay("")
    setHistory("")
  }

  const handleCalculate = () => {
    try {
      const sanitizedDisplay = display.replace(/x/g, "*");
      setHistory(display)
      setDisplay(eval(sanitizedDisplay).toString())
    } catch {
      setDisplay("Error")
    }
  }

  const numberButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "+-"]
  const basicOperations = ["/", "x", "-", "+", "="]
  const scientificFunctions = [
    { label: "sqrt", type: "function" },
    { label: "pi", type: "function" },
    { label: "e", type: "function" },
    { label: "ln", type: "function" },
    { label: "log", type: "function" },
    { label: "n!", type: "function" },
    { label: "|x|", type: "function" },
    { label: "x^2", type: "function" },
    { label: "10^x", type: "function" },
    { label: "1/x", type: "function" },
    { label: "x^y", type: "function" },
    { label: "mod", type: "function" },
  ]
  const controlButtons = [
    { label: "CE", type: "operation" },
    { label: "C", type: "operation" },
    { label: "(", type: "operation" },
    { label: ")", type: "operation" },
  ]

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Content">
          <view className="Calculator">
            <view className="DisplayContainer">
              <view className="History">
                <text>{history}</text>
              </view>
              <view className="Display">
              <text className="single-line-display">{display || "0"}</text>
              </view>
            </view>

            <view className="ButtonsContainer">
              <view className="ButtonsGrid">
                <view className="ScientificSection">
                  {scientificFunctions.map((btn) => (
                    <CalculatorButton
                      key={btn.label}
                      label={btn.label}
                      onClick={() => handleButtonClick(btn.label)}
                      type="function"
                    />
                  ))}
                </view>

                <view className="MainSection">
                  <view className="ControlSection">
                    {controlButtons.map((btn) => (
                      <CalculatorButton
                        key={btn.label}
                        label={btn.label}
                        onClick={() => handleButtonClick(btn.label)}
                        type="operation"
                      />
                    ))}
                  </view>

                  <view className="NumberPad">
                    {numberButtons.map((num) => (
                      <CalculatorButton
                        key={num}
                        label={num}
                        onClick={() => handleButtonClick(num)}
                        type="number"
                        className={num === "0" ? "zero-button" : ""}
                      />
                    ))}
                  </view>

                  <view className="OperationsSection">
                    {basicOperations.map((op) => (
                      <CalculatorButton
                        key={op}
                        label={op}
                        onClick={() => handleButtonClick(op)}
                        type={op === "=" ? "equals" : "operation"}
                      />
                    ))}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  )
}

