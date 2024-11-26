import  Button from "../../components/button"
import { useState } from "react";

export function LandingPage() {
    const [text, setText] = useState<string>("");
    const [firstTime, setFirstTime]= useState(false)
  
  
    return (
    <div className="bg-gray-700 flex justify-center h-screen w-screen">

      <div className="text-center text-white">
        <h1 className="mb-80 text-4xl font-bold pt-48">TALK TO ME</h1>    

    {!firstTime ? <><Button text="CONTINUE"/>

        <Button text="CHAPTERS"/>
        <Button text="START GAME IN ANOTHER LANGUAGE"/></>: 
        <Button text="START"/>}
      </div>
    </div>
    )
  }