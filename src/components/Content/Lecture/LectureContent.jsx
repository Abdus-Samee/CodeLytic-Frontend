import { useEffect, useState } from 'react'

import transition from '../../../transition'

import '../../../assets/css/showlecturecontent.css'

const LectureContent = ({ content }) => {
    const [contentItems, setContentItems] = useState([])

    useEffect(() => {
        let str = "[{key:'h1',val:'Graph: The Essence of Relationships'},{key:'h2',val:'Defining Graphs'},{key:'text',val:'Graphs provide a visual representation of connections between objects or entities. They are composed of vertices and edges that illustrate relationships and interactions.'},{key:'h2',val:'Types of Graphs'},{key:'text',val:'Graphs can be categorized as directed or undirected, based on the presence or absence of arrows on edges. Understanding these distinctions is crucial for grasping the broader applications of graph theory.'},{key:'h2',val:'Vertex and Edge'},{key:'text',val:'Vertices are the individual points in a graph, while edges connect pairs of vertices, signifying a relationship between them.'},{key:'h2',val:'Embracing Degrees'},{key:'text',val:'A vertexs degree is a measure of how many edges are connected to it. This concept is particularly significant in analyzing the connectivity and relationships within a graph.'},{key:'h2',val:'Graph Representation'},{key:'text',val:'There are different ways to represent graphs. One approach involves using an adjacency matrix, which presents the relationships between vertices in a matrix format. Alternatively, an adjacency list outlines the neighbors of each vertex.'}]"
        str = str.replace(/(\bkey\b|val)/g, "'$&'")
        // console.log('keyval single', str)
        str = str.replaceAll("\"", "&quot;")
        // console.log('quot', str)
        str = str.replaceAll("'","\"")
        // console.log(`${str}`)
        setContentItems(JSON.parse(str))
    }, [])

    return (
        <div className="display-lec-content">
            {contentItems.map((o, k) => (
                <div key={k} className="display-lec-content-item">
                    {o.key === 'h1' && <h1>{o.val}</h1>}
                    {o.key === 'h2' && <h2>{o.val}</h2>}
                    {o.key === 'text' && <p>{o.val}</p>}
                </div>
            ))}
        </div>
    )
}

export default transition(LectureContent)