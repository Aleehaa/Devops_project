import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')

  const sum = useMemo(() => {
    const a = Number(firstValue)
    const b = Number(secondValue)
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return ''
    }
    return a + b
  }, [firstValue, secondValue])

  return (
    <main className="page">
      <div className="adder-card">
        <h1>Calculator</h1>
        <p className="subtitle">Enter two numbers to see their sum instantly.</p>
        <div className="inputs">
          <input
            type="number"
            inputMode="decimal"
            placeholder="First number"
            aria-label="First number"
            value={firstValue}
            onChange={(e) => setFirstValue(e.target.value)}
          />
          <span className="op">+</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="Second number"
            aria-label="Second number"
            value={secondValue}
            onChange={(e) => setSecondValue(e.target.value)}
          />
          <span className="op">=</span>
          <output className="sum" aria-live="polite" aria-label="Sum">
            {sum !== '' ? sum : '—'}
          </output>
        </div>
      </div>
    </main>
  )
}

export default App
