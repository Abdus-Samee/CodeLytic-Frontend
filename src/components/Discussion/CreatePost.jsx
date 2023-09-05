import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Autocomplete, TextField, Paper, CircularProgress, Button } from "@mui/material"
import ReactQuill from "react-quill"
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import { ref, uploadBytes, getDownloadURL, uploadString, getStorage } from "firebase/storage"
import { v4 } from "uuid"

import { storage } from "../../services/firebase"
import { loadAllTags } from "../../services/course-service"
import { createPost } from "../../services/posts"
import transition from "../../transition"

import "react-quill/dist/quill.snow.css"
import "../../assets/css/createpost.css"

const CreatePost = ({ token }) => {
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const navigate = useNavigate()

  // const tags = [
  //   { label: 'sorting' },
  //   { label: 'graph' },
  //   { label: 'dfs' },
  //   { label: 'bfs' },
  //   { label: 'searching' },
  //   { label: 'dp' },
  //   { label: 'recursion' },
  // ]

  const [view, setView] = useState("create")
  const [isError, setError] = useState(null)
  const [userInfo, setuserInfo] = useState({
    title: '',
    content: '',
    tagIds: [],
  })

  useEffect(() => {
    if(!token){
      navigate('/login')
    }

    console.log('token', token)

    const customHeaders = {
      Authorization: 'Bearer ' + token,
    }
    
    loadAllTags(customHeaders).then((res) => {
        setTags(res)
        console.log("tags:", res)
    }).catch(e => console.log(e))
  }, [])

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  } 

  const onbody = (value) => {
    setuserInfo({ ...userInfo,
      content:value
    })
  }

  const handleTabClick = (e) => {
    setView(e.target.value)
  }

  const handleTagSelection = (val) => {
    // setuserInfo({ ...userInfo,
    //     tags: val
    // })

    setSelectedTags(val)
    //stores in the form of (id, name)
  }
  
  const addDetails = async (event) => {    
    event.preventDefault()

    if(userInfo.title.length === 0){
        setError('Required, Add title')
        return
    }else if(userInfo.content.length === 0){
        setError('Required, Add body')
        return
    }

    //make tagIds an array of only strings
    // const tagGG = userInfo.tagIds.map(tag => tag.name)
    // const tagIds = tags.filter(tag => tagGG.includes(tag.name)).map(tag => tag.id)
    // userInfo.tagIds = tagIds

    const tagIds = selectedTags.map(tag => tag.id)
    userInfo.tagIds = tagIds

    console.log("Post:", userInfo)

    const parser = new DOMParser()
    const doc = parser.parseFromString(userInfo.content, 'text/html')
    const images = doc.querySelectorAll('img')

    const urls = Array.from(images).map(img => img.src)
    console.log("urls:", urls)

    //wait until uploading all urls
    const uploadPromises = urls.map(url => {
      const imageRef = ref(storage, `posts/${v4()}`)
      return uploadString(imageRef, url, 'data_url')
    })

    const uploadedUrls = await Promise.all(uploadPromises)
    console.log("uploadedUrls:", uploadedUrls)

    setError('')
    setLoading(true)
    // return

    const customHeaders = {
      Authorization: 'Bearer ' + token,
    }


    createPost(userInfo, customHeaders).then((res) => {
      setLoading(false)
      navigate('/discussion')
    }).catch(e => {
      console.log(e)
      setLoading(false)
      setError('Something went wrong, please try again')
    })
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
                                value={userInfo.content}
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
                                    value={selectedTags}
                                    options={tags}
                                    getOptionLabel={(option) => option.name}
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
                            <button 
                              id="discussion-btn" 
                              type="submit" 
                              disabled={loading} 
                              className="btn btn__theme" 
                              style={{ 
                                position: 'relative', 
                                cursor: loading ? 'default' : 'pointer',
                                opacity: loading ? '0.7' : '1',
                              }}
                            >
                              Submit
                            </button>
                            {loading && 
                              <CircularProgress 
                                size={24} 
                                color="secondary"
                                style={{ position: 'absolute', top: '85%', left: '84%', }} 
                              />
                            }                         
                        </div> 
                    </div> 
                    </form>
                </div>
            </div>
        </div>) : (
        <div className="discussion-app">
            <div className="container">
                <div className="row preview-title">
                  {userInfo.title ? <h1>{userInfo.title}</h1> : <h1>No title added... :(</h1>}
                </div>
                {userInfo.content ? (
                  <div className="row preview-content" dangerouslySetInnerHTML={{ __html: userInfo.content }}></div>
                ) : (
                  <div className="row preview-content">No content added... :(</div>
                )}
                <div className="row preview-post-tags">
                    {selectedTags.map((tag, idx) => (
                        <span key={idx}>{tag.name}</span>
                    ))}
                </div>
            </div>
        </div>
    )}
</>
)
}
export default transition(CreatePost)