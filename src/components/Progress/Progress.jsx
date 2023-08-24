import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ResponsiveCalendar } from "@nivo/calendar"
import { motion } from "framer-motion"

import transition from "../../transition"

import "../../assets/css/progress.css"

const Progress = ({ token }) => {
    const [width, setWidth] = useState(0)
    const carousel = useRef()

    const navigate = useNavigate()

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

    const ongoingCourses = [
        {
          title: 'Basic Graph Theory',
          body: 'Learn the basics of graph theory',
          author: 'John Doe',
        },
        {
          title: 'Dynamic Programming',
          body: 'Learn the basics of dynamic programming',
          author: 'John Doe',
        },
        {
          title: 'Number Theory',
          body: 'Learn the basics of number theory',
          author: 'Rick & Morty',
        },
        {
          title: 'String Algorithms',
          body: 'Learn the basics of string algorithms',
          author: 'Trudy',
        },
        {
          title: 'Discrete Mathematics',
          body: 'Learn the basics of discrete mathematics',
          author: 'Eve',
        },
      ]

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
    };

    colorScaleFn.ticks = () => ticks
    
    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])

    return (
        <div className="" style={{ height: '100vh', }}>
            <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing", }}>
              <h3 className="ongoing-carousel-header">Ongoing Courses</h3>
              <motion.div drag="x" dragConstraints={{ right: 0, left: -width, }} className="inner-carousel">
                {ongoingCourses.map((course, index) => (
                  <motion.div className="item" key={index}>
                    <article className="ongoing-card">
                      <header className="ongoing-card-header">
                        <h2>{course.title}</h2>
                        <div>
                          <div className="progress-4"></div>
                          70%
                        </div>
                      </header>
                      <div className="ongoing-card-author">
                        <div className="ongoing-author-name">
                          <div className="ongoing-author-name-prefix">Author</div>
                          <p>{course.author}</p>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
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
                        <strong style={{ color: 'white', }}>
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

export default transition(Progress)