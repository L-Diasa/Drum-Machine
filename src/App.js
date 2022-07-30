import React, {useState} from "react"
import PadBank from "./components/PadBank"
import {bankOne, bankTwo} from "./data.js"

export default function App() {
  const [power, setPower] = useState(true)
  const [display, setDisplay] = useState(String.fromCharCode(160))
  const [currentPadBank, setCurrentPadBank] = useState(bankOne)
  const [currentPadBankId, setCurrentPadBankId] = useState('Heater Kit')
  const [sliderVal, setSliderVal] = useState(0.3)

  const powerSlider = power
    ? {
        float: 'right'
      }
    : {
        float: 'left'
      }
  const bankSlider = currentPadBank === bankOne
    ? {
        float: 'left'
      }
    : {
        float: 'right'
      }
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = sliderVal
    })

  function powerControl() {
    setPower(prevVal => !prevVal)
    setDisplay(String.fromCharCode(160))
  }

  function selectBank() {
    if (power) {
      if (currentPadBankId === 'Heater Kit') {
          setCurrentPadBank(bankTwo)
          setDisplay('Smooth Piano Kit')
          setCurrentPadBankId('Smooth Piano Kit')
      } else {
          setCurrentPadBank(bankOne)
          setDisplay('Heater Kit')
          setCurrentPadBankId('Heater Kit')
      }
    }
  }

  function displayClipName(name) {
    if (power) {
        setDisplay(name)
    }
  }

  function adjustVolume(e) {
    if (power) {
      setSliderVal(e.target.value)
      setDisplay('Volume: ' + Math.round(e.target.value * 100))
      setTimeout(() => clearDisplay(), 1000);
    }
  }

  function clearDisplay() {
    setDisplay(String.fromCharCode(160))
  }

  return (
    <div className='inner-container' id='drum-machine'>
      <PadBank
        clipVolume={sliderVal}
        currentPadBank={currentPadBank}
        power={power}
        updateDisplay={displayClipName}
      />

      <div className='logo'>
        <div className='inner-logo '>{'FCC' + String.fromCharCode(160)}</div>
        <i className='inner-logo fa fa-free-code-camp' />
      </div>

      <div className='controls-container'>
        <div className='control'>
          <p>Power</p>
          <div className='select' onClick={powerControl}>
            <div className='inner' style={powerSlider} />
          </div>
        </div>
        <p id='display'>{display}</p>
        <div className='volume-slider'>
          <input
            max='1'
            min='0'
            onChange={adjustVolume}
            step='0.01'
            type='range'
            value={sliderVal}
          />
        </div>
        <div className='control'>
          <p>Bank</p>
          <div className='select' onClick={selectBank}>
            <div className='inner' style={bankSlider} />
          </div>
        </div>
      </div>
    </div>
  )
}