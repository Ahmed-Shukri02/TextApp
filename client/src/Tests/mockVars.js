const mockAuthor = {
  user_id: "e0a0aca0-a4d7-4b74-94b2-f128930c3e81",
  username: "brain3",
  user_pfp: "1660215592243ss_a7b90773770ff884387199491885c12a57bdfc5d.1920x1080.jpg",
  stock_pfp: 18,
  f_name: "brain",
  l_name: "three",
  email: "brain3@gmail.com",
  is_verified: false,
  followers: "0",
  bg_theme: null,
  bg_image: null
}
const mockClient = {
  user_id: "e0a0aca0-a4d7-4b74-94b2-f128930c3e81",
  username: "brain3",
  user_pfp: "1660215592243ss_a7b90773770ff884387199491885c12a57bdfc5d.1920x1080.jpg",
  stock_pfp: 18,
  f_name: "brain",
  l_name: "three",
  email: "brain3@gmail.com",
  is_verified: false,
  followers: "0",
  bg_theme: null,
  bg_image: null
}

/*
  ========================= MOCK POSTS ========================= 
*/

const mockPost = {// post created by someone who isnt't a client
  post_id: "fd911604-67a5-4b8a-bac5-1f7356e4cdb9",
  post_author_id: "b92b075c-e216-42d6-8d3a-8d5255002cbb",
  post_text: "next post",
  post_media: null,
  post_likes: 1,
  post_replies: 0,
  post_time : "2022-07-23T12:57:02.750Z"
}
const mockClientPost = { // post created by client
  ...mockPost,
  post_author_id: mockClient.user_id
}

/*
  ========================= MOCK REPLIES ========================= 
*/

const mockReply = {
  reply_id: "afb4e041-f405-47af-aa8d-c26c28a5b787",
  foreign_post_id: "8dcb9485-bc3e-44bb-a101-ae182325516f",
  reply_author_id: "b92b075c-e216-42d6-8d3a-8d5255002cbb",
  reply_text: "wag",
  reply_likes: 0,
  reply_replies: 0,
  reply_time: "2022-08-12T17:27:55.647Z",
  username: "brain3",
  stock_pfp: 18,
  user_pfp: "1660215592243ss_a7b90773770ff884387199491885c12a57bdfc5d.1920x1080.jpg",
  subreplies: []
}
const mockClientReply = {
  ...mockReply,
  reply_author_id : mockClient.user_id
}

/*
  ========================= MOCK SUBREPLIES ========================= 
*/


const mockSubreply = {
  subreply_id: "7c35f24f-3255-4a24-9ff3-d7b9aa11400c",
  foreign_reply_id: "6fad06e9-e69f-4665-90fa-30a152cbc5b4",
  subreply_author_id: "813e209f-a989-41a9-a249-b1194b20af6a",
  reference_type: "comment",
  subreply_reference_id: null,
  subreply_text: "d",
  subreply_likes: 0,
  subreply_time: "2022-08-19T11:19:17.404Z",
  username: "ahmed shukri",
  stock_pfp: 13,
  user_pfp: "https://lh3.googleusercontent.com/a/AItbvmnXM3kGZyOGORZhZZ0LX70kpyWnoEP7LL7E475a=s96-c"
}

const mockClientSubreply = {
  ...mockSubreply,
  subreply_author_id : mockClient.user_id
}

export {
  mockAuthor, mockPost, mockClient, mockClientPost, mockReply, mockClientReply,
  mockSubreply, mockClientSubreply
}

export function loadedImages(num){
  <div className="media-loading"></div>
}
