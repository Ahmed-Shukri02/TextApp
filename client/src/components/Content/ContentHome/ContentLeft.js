import React, {useState, useEffect, useContext} from "react";
import IconComponents from "../../../icon-components/icon-components"
import { StockImages } from "../../../Contexts/StockImages";
import ContentPost from "./ContentPost"
import serverLocation from "../../../Tools/serverLocation";

export default function ContentLeft({userInfo, setLoaded}){
  
  const [noPosts, setNoPosts] = useState(false)
  const [posts, setPosts] = useState([])
  const {images} = useContext(StockImages)

  function loadSingleImg(num){
    return images? 
      <img src={images[num].download_url} alt="single-1"/> : 
      <div className="related-image-loading"></div>
  }

  useEffect(() => {
    async function getPosts(){
      try{
        let posts = await fetch(` ${serverLocation}/api/posts?author_id=${userInfo.user_id}`, {
          method: "GET",
          headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
        })

        let postsJson = await posts.json()
        if(postsJson === -1){ // -1 means no post, -2 means no user
          setNoPosts(true)
        } else{
          setPosts(postsJson)
        }

      }
      catch(err){
        console.log(err)
      }

      setTimeout(() => {
        setLoaded(true)
      }, 2000);
    }

    setLoaded(false)
    getPosts()

  }, [userInfo.user_id])

  function popIndex(index){
    let posts_copy = [...posts]
    posts_copy.splice(index, 1)
    setPosts(posts_copy)
  }

  const postsJSX = posts.map((elem, index) => <ContentPost index={index} postInfo={elem} userInfo={userInfo} key={elem.post_id} removeIndex={popIndex}/>)
  
  return (
    <div className="content-home-left">
      <div className="about">
        <h3>About</h3>
        <div><IconComponents.InfoIcon/>{userInfo.username} contributed to {posts.length} post(s)</div>
        <div><IconComponents.ThumbUpIcon/>{userInfo.followers} people follow {userInfo.username}</div>
        {/* <div><IconComponents.GlobeIcon/>http://instagram.com/</div>
        <div><IconComponents.FolderIcon/>App Page · Home</div> */}

      </div>

      <div className="content-home">
        <h3>Recent Contributions</h3>
        <div className="content-home-right">
          { noPosts &&
          <div style={{textAlign: "center"}}> This user has no posts </div>
          }
          {postsJSX.slice(0, 3)}
        </div>
      </div>

      <div className="related-pages">
        <h3>Followers</h3>
        <div style={{textAlign: "center"}}>This feature has not been added yet.</div>
      </div>
    </div>
  )
  }