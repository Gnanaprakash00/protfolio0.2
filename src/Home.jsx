import React from 'react'
import './Home.css'
import { useState,useEffect,useRef} from 'react';


const Home = () => {
  const[userinput,setUserInput] = useState('');
  const[activewordindex,setActiveWordIndex]=useState(0);
  const[correctWordArray,setCorrectWordArray]=useState([]);
  const[notification,setNotification]=useState(false);
  const[time,setTime]=useState(0);
  const text =()=>`prakash gnana raj selve hema rajvegakollai`.split(' ');
  const cloud = useRef(text());

  
  function onfocus(){
    var status = document.getElementById('status');
    status.innerHTML = "ON";
    status.style.color="green"
    setInterval(()=>{
       setTime(time=>time + 1) 
    },1000)   
  }

  useEffect(()=>{
    if(time == 11){
      setNotification(true)
    }
  },[time]);

  function Word(props){
    const {text,active,correct}=props;
    if(correct === true){
        return <span className='correct'>{text} </span>
    }if(correct === false){
        return <span className='incorrect'>{text} </span>
    }
    if(active){
        return <span className='active'>{text} </span>
    }
    return <span>{text} </span>
}

function processInput(value){
    if(value.endsWith(' ')){
        setActiveWordIndex(index=>index+1);
        setUserInput(' ');
        setCorrectWordArray(data=>{
                const word = value.trim()
                const newResult = [...data]
                newResult[activewordindex] = word === cloud.current[activewordindex]
                return newResult
            })
        
    }else{
        setUserInput(value)
    }
}


  return (
    <>
    <div className="container">
      <h5><marquee behavior="" direction="">typewriteing pratice</marquee></h5>
      <div className="show-status">
        <div className="show-mode" id='status'>OFF</div>
        <div className="show-mode">
          <div className="speed">Speed : 00</div>
          <div className="accurrecy">Accurrecy : 00</div>
          <div className="time">Time : {time.toString().padStart(2,'0')}</div>
        </div>
      </div>
      <div className="system-text">{cloud.current.map((word,index)=>{
            return <Word text={word}
                        active={index === activewordindex}
                        correct={correctWordArray[index]}
            />
            })}</div>

      <div className="user-text">
        <textarea value={userinput} onFocus={()=>onfocus()}  placeholder='Start typing here...' cols="121" rows="16" onChange={(e)=>processInput(e.target.value)}></textarea>
      </div>
    </div>
    </>
  )
}

export default Home
