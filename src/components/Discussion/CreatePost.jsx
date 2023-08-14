import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Autocomplete, TextField, Paper } from "@mui/material"
import ReactQuill from "react-quill"
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import "react-quill/dist/quill.snow.css"

import "../../assets/css/createpost.css"

const CreatePost = () => {
  const navigate = useNavigate()

  const tags = [
    { label: 'sorting' },
    { label: 'graph' },
    { label: 'dfs' },
    { label: 'bfs' },
    { label: 'searching' },
    { label: 'dp' },
    { label: 'recursion' },
  ]

  const [view, setView] = useState("create")
  const [isError, setError] = useState(null)
  const [userInfo, setuserInfo] = useState({
    title: '',
    body: '',
    tags: [],
  })

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  } 

  const onbody = (value) => {
    setuserInfo({ ...userInfo,
      body:value
    })
  }

  const handleTabClick = (e) => {
    setView(e.target.value)
  }

  const handleTagSelection = (val) => {
    setuserInfo({ ...userInfo,
        tags: val
    })
  }
  
  const addDetails = async (event) => {
    // try {
    //   event.preventDefault()
    //   event.persist()
    //   if(userInfo.description.length < 50){
    //     setError('Required, Add description minimum length 50 characters')
    //     return
    //   }
    //   axios.post(`http://localhost:8080/addArticle`, {
    //     title: userInfo.title,
    //     description: userInfo.description,
    //     information: userInfo.information,
    //   })
    //   .then(res => {
    //     if(res.data.success === true){
    //       history.push('/')
    //     }
    //   })
    // } catch (error) { throw error}    
    
    event.preventDefault()

    if(userInfo.title.length === 0){
        setError('Required, Add title')
        return
    }else if(userInfo.body.length === 0){
        setError('Required, Add body')
        return
    }

    console.log("Post:", userInfo)
    navigate('/discussion')
  } 

return ( 
<>
    <div className="discussion-wrapper">
        <div className="discussion-tabs">
            <div className="discussion-tab">
                <input type="radio" name="css-tabs" id="tab-1" value="create" checked={view === "create"} onChange={handleTabClick} className="discussion-tab-switch" />
                <label for="tab-1" className="discussion-tab-label">Create Discussion</label>
            </div>
            <div className="discussion-tab">
                <input type="radio" name="css-tabs" id="tab-2" value="preview" checked={view === "preview"} onChange={handleTabClick} className="discussion-tab-switch" />
                <label for="tab-2" className="discussion-tab-label">Preview</label>
            </div>
        </div>
    </div>
    {view === "create" ? (
        <div className="discussion-app">
            <div className="container">
                <div className="row"> 
                    <form onSubmit={addDetails} className="update__forms">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label id="discussion-label" className="font-weight-bold"> Title <span className="required"> * </span> </label>
                            <input id="discussion-input" type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group col-md-12 editor">
                            <label id="discussion-label" className="font-weight-bold"> Body <span className="required"> * </span> </label>
                            <EditorToolbar toolbarId={'t1'}/>
                            <ReactQuill
                                theme="snow"
                                value={userInfo.body}
                                onChange={onbody}
                                placeholder={"Write something awesome..."}
                                modules={modules('t1')}
                                formats={formats}
                            />
                        </div>
                        <br />
                        {isError !== null && <div className="errors"> {isError} </div>}
                        <div className="discussion-bottom form-group col-sm-12 text-right">
                            <div className="discussion-tag-selection">
                                <Autocomplete
                                    multiple
                                    id="discussion-tags-outlined"
                                    options={tags}
                                    getOptionLabel={(option) => option.label}
                                    filterSelectedOptions
                                    PaperComponent={({ children }) => (
                                      <Paper style={{ background: "#445069" }}>{children}</Paper>
                                    )}
                                    onChange={(event, value) => handleTagSelection(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Add tags"
                                            style={{ color: "pink !important" }}
                                        />
                                    )}
                                />
                            </div>
                            <button id="discussion-btn" type="submit" className="btn btn__theme">Submit</button>
                        </div> 
                    </div> 
                    </form>
                </div>
            </div>
        </div>) : (
        <div className="discussion-app">
            <div className="container">
                <div className="row" dangerouslySetInnerHTML={{ __html: userInfo.body }}></div>
            </div>
        </div>
    )}
</>
)
}
export default CreatePost