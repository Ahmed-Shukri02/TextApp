import configureStore from "redux-mock-store"
import { findByTestId, fireEvent, getByRole, getByTestId, getByText, queryByRole, queryByTestId, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import React from "react";
import ReactDOM from "react-dom"
import ContentPost from "../../../components/Content/ContentHome/ContentPost";
import { Provider } from "react-redux";

import {mockAuthor, mockPost, mockClient, mockClientPost} from "../../mockVars.js"

// creates mock client to be working with the componenet
const mockStore = configureStore([])
var store;
beforeEach(() => {
  store = mockStore({
    clientInfo: {value: {payload: mockClient}}
  })
})

describe("Content Posts", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <ContentPost userInfo={mockAuthor} postInfo={mockPost}/>
      </Provider>
    )
  })
  
  it("doesnt allow for user that is not creator of post to delete post", () => {
    let {container} = render(
      <Provider store={store}>
        <ContentPost userInfo={mockAuthor} postInfo={mockPost}/>
      </Provider>
    )
  
    fireEvent.mouseEnter(getByTestId(container, "person-detail-flex"))
    let deleteButton = queryByRole(getByTestId(container, "delete-options"), "button")
    expect(deleteButton).not.toBeInTheDocument()
  })
  
  it("does allow for user that is creator of post to delete post", () => {
    // use mockClient as userInfo to simulate client being the author of post
    let {container} = render(
      <Provider store={store}>
        <ContentPost userInfo={mockClient} postInfo={mockClientPost}/>
      </Provider>
    )
    
    let hoverContainer = getByTestId(container, "person-detail-flex")
    fireEvent.mouseEnter(hoverContainer)
  
    let deleteButtonContainer = getByTestId(container, "delete-options")
  
    let deleteButton = queryByRole(deleteButtonContainer, "button")
    expect(deleteButton).toBeInTheDocument()
  })
  
  it("comment box toggles when pressed", async () => {
    let {container} = render(
      <Provider store={store}>
        <ContentPost userInfo={mockAuthor} postInfo={mockPost}/>
      </Provider>
    )
  
    // comment box should not be open initially
    var commentBox
  
    commentBox = await queryByTestId(container, "comment-box")
    expect(commentBox).not.toBeInTheDocument()
  
    // open box and check if it exists
    let commentButton = await findByTestId(container, "chat-button")
    fireEvent.click(commentButton)
  
    commentBox = await queryByTestId(container, "comment-box")
    expect(commentBox).toBeInTheDocument()
    
    // close box and check if it exists
    fireEvent.click(commentButton)
    commentBox = await queryByTestId(container, "comment-box")
    expect(commentBox).not.toBeInTheDocument()

  })
})



