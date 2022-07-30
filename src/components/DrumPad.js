
import React, {useState, useEffect} from "react"

const activeStyle = {
    backgroundColor: 'orange',
    boxShadow: '0 3px orange',
    height: 77,
    marginTop: 13
  };
  
const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};

export default function DrumPad(props) {
    const [padStyle, setPadStyle] = useState(inactiveStyle)

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return() => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [])

    useEffect(() => {
      if(padStyle.backgroundColor === 'orange' || 
        (!props.power && padStyle.marginTop === 13))
      setTimeout(() => {
          activatePad()}, 100);
  }, [padStyle])

    function handleKeyPress(e) {
        if (e.keyCode === props.keyCode) {
          playSound();
        }
    }

    function activatePad() {
        if (props.power) {
          if (padStyle.backgroundColor === 'orange') {
              setPadStyle(inactiveStyle)
          } else {
              setPadStyle(activeStyle)
          }
        } else if (padStyle.marginTop === 13) {
            setPadStyle(inactiveStyle)
        } else {
            setPadStyle({
              height: 77,
              marginTop: 13,
              backgroundColor: 'grey',
              boxShadow: '0 3px grey'
            })
        }
      }

    function playSound() {
        const sound = document.getElementById(props.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        activatePad();
        props.updateDisplay(props.clipId.replace(/-/g, ' '));
      }

    return (
        <div
          className='drum-pad'
          id={props.clipId}
          onClick={playSound}
          style={padStyle}
          >
          <audio
            className='clip'
            id={props.keyTrigger}
            src={props.clip}
          />
          {props.keyTrigger}
        </div>
    )
}