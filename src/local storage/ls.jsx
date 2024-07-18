import { useEffect, useState } from "react";


// local storage
const [ info , setInfo] = useState(state)


useEffect(function(){
  localStorage.setItem("basketInfo" , JSON.stringify(info))
} , [info])

useEffect(function(){
  const res = JSON.parse(localStorage.getItem("basketInfo"))
  if(res){
    setInfo(res);
  }
  console.log(res)

} , [])
// local storage



