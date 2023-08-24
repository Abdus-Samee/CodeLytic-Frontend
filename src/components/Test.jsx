import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { storage } from "../services/firebase"
import { ResponsiveCalendar } from "@nivo/calendar"

// import '../assets/css/test.css'

const Test = ({ token }) => {
    // const [data, setData] = useState([])

    const data = [
        {
            "value": 9,
            "day": "2023-06-18"
          },
          {
            "value": 7,
            "day": "2023-11-03"
          },
          {
            "value": 24,
            "day": "2023-07-13"
          },
          {
            "value": 21,
            "day": "2023-03-18"
          },
          {
            "value": 11,
            "day": "2023-08-18"
          },
          {
            "value": 4,
            "day": "2023-09-05"
          },
          {
            "value": 3,
            "day": "2023-10-17"
          },
    ]

    const navigate = useNavigate()

    // const colours = ["#333440", "#333440", "#00E4429", "#006D32", "#26A641", "#39D353",]
    // const ticks = ["Loss", 0, 5, 10, 15, 20]
    // const colorScale = ({ value }) => {
    //     if(value < 0 || value === "Loss"){
    //         return colours[0]
    //     }

    //     if(value === 0){
    //         return colours[1]
    //     }
        
    //     for(let i = 2; i < ticks.length; i++){
    //         if(value < ticks[i]){
    //             return colours[i]
    //         }
    //     }

    //     console.log(value)
    //     return colours[colours.length - 1]
    // }
    // colorScale.ticks = () => ticks

    const colors = [
        "#ff0000",
        "rgba(255, 255, 255, 0.5)",
        "#00E4429",
        "#006D32",
        "#26A641",
        "#39D353",
      ];
    
      const ticks = ["Loss", 0, 5, 10, 15];
      const colorScaleFn = (value) => {
        if (value < 0 || value === "Loss") {
          return colors[0];
        }
        if (value == 0) {
          return colors[1];
        }
        for (let i = 2; i < ticks.length; i++) {
          if (value < ticks[i]) {
            return colors[i];
          }
        }
        return colors[colors.length - 1];
      };
    
      colorScaleFn.ticks = () => ticks;

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    
        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }

        // let tempData = []
        // for(let i = 0; i < 30; i++){
        //     let tempObj = {}
        //     //sequentially assign dates in format YYYY-MM-DD changing months and days
        //     tempObj.day = '2023-08-' + (i + 1).toString()
        //     tempObj.value = Math.floor(Math.random() * 100)
        //     tempData.push(tempObj)
        // }
        // setData(tempData)

        // console.log(tempData)
    }, [])
    
    return (
        <div className="" style={{ height: '100vh', }}>
            <h3>Testing User Progress...</h3>
            <div style={{ height: '50vh', width: '70vw', }}>
                <ResponsiveCalendar
                    data={data}
                    from="2023-01-01"
                    to="2023-12-31"
                    emptyColor="#333440"
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#17141D"
                    dayBorderWidth={2}
                    dayBorderColor="#17141D"
                    tooltip={({ day, value, color }) => (
                        <strong style={{ color }}>
                            {value}: {color}
                        </strong>
                    )}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'row',
                            translateY: 36,
                            itemCount: 4,
                            itemWidth: 42,
                            itemHeight: 36,
                            itemsSpacing: 14,
                            itemDirection: 'right-to-left',
                        }
                    ]}
                    colorScale={colorScaleFn}
                />
            </div>
        </div>
    )
}

export default Test
