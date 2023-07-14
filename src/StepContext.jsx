import React, { useState } from "react"

import CreateCourse from "./components/CreateCourse"

export const multiStepContext = React.createContext()

export const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    const submitData = () => {

    }

    return(
        <div>
            <multiStepContext.Provider 
                value={{ currentStep, setCurrentStep, userData, setUserData, finalData, setFinalData, submitData }} >
                    <CreateCourse />
            </multiStepContext.Provider>
        </div>
    )
}