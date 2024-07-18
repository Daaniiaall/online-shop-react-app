import { useEffect, useState } from "react";

function useLocalStorage(key , initialValue){

    const [value , setValue] = useState(function(){
        const localData = localStorage.getItem(key)
        return localData ? JSON.parse(localData) : initialValue
    })
    useEffect(function(){
        localStorage.setItem(key , JSON.stringify(value))
    } , [value])

    return [value , setValue]
}

export {useLocalStorage}