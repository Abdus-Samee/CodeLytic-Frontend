import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CircularProgress, Container, Button, Snackbar } from "@mui/material"
import { ResponsiveCalendar } from "@nivo/calendar"
import { ResponsivePie } from "@nivo/pie"

import { updateRole, getAllUsers } from "../../services/user-service"

import '../../assets/css/admin.css'

const User = ({token}) => {
    const [loading, setLoading] = useState(true)
    const [users, setusers] = useState([])
    const [progress, setProgress] = useState([])
    const [enroll, setEnroll] = useState([])
    const [showCalendar, setShowCalendar] = useState(false)
    const [showPie, setShowPie] = useState(false)
    const [roleChange, setRoleChange] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const customHeaders = {
            Authorization: 'Bearer ' + token
        }

        getAllUsers(customHeaders).then((res) => {
            setusers(res)
            setLoading(false)
        }).catch((e) => console.log(e))
    }, [])

    const handleRoleChange = (email) => {
        setOpen(true)

        const customHeaders = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }

        updateRole(email, roleChange, customHeaders).then((res) => {
            const updated = [...users]
            const index = updated.findIndex((u) => u.email === email)
            if(index !== -1){
                updated[index].role = roleChange
                setusers(updated)
            }
            setOpen(false)
        }).catch((e) => console.log(e))
    }

    const changeDateFormat = (date) => {
        const dateComponents = date.split('-')
        const year = dateComponents[2]
        const month = dateComponents[1]
        const day = dateComponents[0]
  
        const newDate = `${year}-${month}-${day}`
  
        return newDate;
    }

    const ticks = ["Loss", 0, 5, 10, 15]

    const colors = [
        "#333440",
        "#333440",
        "#0E4429",
        "#006D32",
        "#26A641",
        "#39D353",
    ]

    const colorScaleFn = (value) => {
      if (value < 0 || value === "Loss") {
          return colors[0]
      }

      if (value == 0) {
          return colors[1]
      }
      
      for (let i = 2; i < ticks.length; i++) {
          if (value < ticks[i]) {
          return colors[i]
          }
      }

      return colors[colors.length - 1]
    }

    colorScaleFn.ticks = () => ticks

    const prepareCalendar = () => {
        if(showCalendar){
            setShowCalendar(false)
            return
        }

        const arr = []
        users.forEach((user) => {
            if(user.progress && user.progress.dailyProgress.length > 0){
                user.progress.dailyProgress.forEach((dailyProgress) => {
                    const { date, activities } = dailyProgress
                    const newDate = changeDateFormat(date)
                    const obj = {
                        day: newDate,
                        value: activities.length
                    }

                    const index = arr.findIndex((p) => p.day === newDate)
                    if(index !== -1){
                        arr[index].value += activities.length
                    }else{
                        arr.push(obj)
                    }
                })
            }
        })

        setProgress(arr)
        console.log(arr)
        setShowCalendar(true)
    }

    const getRandomColour = () => {
        const hue = Math.floor(Math.random() * 361)
        const saturation = Math.floor(Math.random() * 51) + 50 // 50-100%
        const lightness = Math.floor(Math.random() * 31) + 50 // 50-80%

        // Construct the HSL color string
        const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`

        return hslColor;
    }

    const prepareCourseChart = () => {
        if(showPie){
            setShowPie(false)
            return
        }

        const arr = []
        users.forEach((user) => {
            if(user.enrolledCourse.length > 0){
                user.enrolledCourse.forEach((course) => {
                    const title  = course.title

                    const obj = {
                        id: title,
                        label: title,
                        value: 1,
                        color: getRandomColour()
                    }

                    const index = arr.findIndex((p) => p.id === title)
                    if(index !== -1){
                        arr[index].value++
                    }else{
                        arr.push(obj)
                    }
                })
            }
        })

        setEnroll(arr)
        setShowPie(true)
    }

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <Container>
                    <div className="admin-users">
                        {users.map((user, key) => (
                            <div key={key} className="admin-user">
                                <div className="admin-user-name">{user.name}</div>
                                <div className="admin-user-email">{user.email}</div>
                                <div className="admin-user-role">
                                    <p>Role: {user.role}</p>
                                    <select className="admin-user-select" onChange={(e) => setRoleChange(e.target.value)}>
                                        <option value="USER">USER</option>
                                        <option value="CONTENT_CREATOR">CONTENT_CREATOR</option>
                                    </select><br />
                                    <Button variant="contained" color="secondary" size="small" onClick={() => handleRoleChange(user.email)}>Change</Button>
                                </div>                            
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" size="small" onClick={prepareCalendar} style={{ marginTop: '2vh', }}>Get User Activities</Button>
                    <Button variant="contained" size="small" color="secondary" onClick={prepareCourseChart} style={{ marginTop: '2vh', marginLeft: '1vw', }}>Get Course Activities</Button>
                    {showCalendar && <div style={{ borderRadius: '16px', background: 'linear-gradient(90deg, rgba(236,232,240,1) 14%, rgba(230,224,216,1) 54%, rgba(223,200,228,1) 100%)', height: '40vh', width: '70vw', margin: '0 auto', marginTop: '1vh' }}>
                        <ResponsiveCalendar
                            data={progress}
                            from="2023-01-01"
                            to="2023-12-31"
                            emptyColor="#333440"
                            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                            yearSpacing={40}
                            monthBorderColor="#17141D"
                            dayBorderWidth={2}
                            dayBorderColor="#17141D"
                            tooltip={({ day, value, color }) => (
                                <strong style={{ color: 'white', }}>
                                    Total Activities on {day}: {value}
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
                    </div>}
                    {showPie && <div style={{ borderRadius: '16px', background: 'linear-gradient(90deg, rgba(236,232,240,1) 14%, rgba(230,224,216,1) 54%, rgba(223,200,228,1) 100%)', height: '40vh', width: '70vw', margin: '0 auto', marginTop: '1vh',  }}>
                        <ResponsivePie
                            data={enroll}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{
                                from: 'color',
                                modifiers: [
                                    [
                                        'darker',
                                        0.2
                                    ]
                                ]
                            }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [
                                    [
                                        'darker',
                                        2
                                    ]
                                ]
                            }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>}
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={open}
                        onClose={() => setOpen(false)}
                        key="bottomcenter"
                    >
                        <div style={{ background: '#5765FF', padding: '0.5rem 5rem', borderRadius: '10px', }}>
                            <span 
                                style={{
                                    display: 'inline',
                                    color: '#000',
                                    fontFamily: '"DM Mono", monospace',
                                }}>
                                    Updating role...
                            </span>
                            <CircularProgress style={{ height: '10%', width: '10%', color: 'yellow', marginLeft: '45%', }} />
                        </div>
                    </Snackbar>
                </Container>
            }
        </>
    )
}

export default User