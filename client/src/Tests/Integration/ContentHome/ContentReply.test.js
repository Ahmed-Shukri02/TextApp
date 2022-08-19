import React from "react"
import ReactDOM from "react-dom"
import { findByTestId, fireEvent, getByRole, queryByTestId, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"

import ContentReply from "../../../components/Content/ContentHome/ContentReply"

import {mockAuthor, mockReply, mockClient, mockClientReply, loadedImages} from "../../mockVars.js"

// creates mock client to be working with the componenet
const mockStore = configureStore([])
var store;
beforeEach(() => {
  store = mockStore({
    clientInfo: {value: {payload: mockClient}}
  })
})

describe("Content Reply", () => {

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <ContentReply info={mockReply} loadedImages={loadedImages} userInfo={mockAuthor}/>
      </Provider>
    )
  })

  it("doesn't allow client to delete reply which isn't theirs", async () => {
    // hover over component and search for 
    let {container} = render(
      <Provider store={store}>
        <ContentReply info={mockReply} loadedImages={loadedImages} userInfo={mockAuthor}/>
      </Provider>
    )

    // await for reply container and fire hover event
    let reply = await findByTestId(container, "reply")
    
    fireEvent.mouseEnter(reply)
    
    let deleteButton = queryByTestId(reply, "delete-icon")
    expect(deleteButton).not.toBeInTheDocument()
    
  })
  
  it("does allow client to delete reply which is theirs", async () => {
    // hover over component and search for 
    let {container} = render(
      <Provider store={store}>
        <ContentReply info={mockClientReply} loadedImages={loadedImages} userInfo={mockClient}/>
      </Provider>
    )
    
    // await for reply container and fire hover event
    let reply = await findByTestId(container, "reply")
    await findByTestId(reply, "reply-content")
    fireEvent.mouseEnter(reply)

    let deleteButton = queryByTestId(reply, "delete-icon")
    expect(deleteButton).toBeInTheDocument()

  })

})