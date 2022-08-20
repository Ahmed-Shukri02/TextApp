import React from "react"
import ReactDOM from "react-dom"
import { findByTestId, fireEvent, getByRole, getByTestId, queryByTestId, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"

import SubReply from "../../../components/Content/ContentHome/ContentSubReply"

import {mockAuthor, mockSubreply, mockReply, mockClient, mockClientSubreply, loadedImages,
  mockRefSubreply} from "../../mockVars.js"

// creates mock client to be working with the componenet
const mockStore = configureStore([])
var store;
beforeEach(() => {
  store = mockStore({
    clientInfo: {value: {payload: mockClient}}
  })
})

const props = {
  info : mockSubreply,
  subreplies: [mockSubreply],
  parentInfo: mockReply,
  loadedImages: loadedImages
}
const clientProps = {
  ...props,
  info: mockClientSubreply,
  subreplies: [mockClientSubreply]
}
const refProps = {
  ...props,
  info: mockRefSubreply,
  subreplies: [mockRefSubreply]
}

describe("basic functions of subreply", () => {
  it("renders without crashing", async () => {
    render(
      <Provider store={store}>
        <SubReply {...props}/>
      </Provider>
    )
  })

  it("doesn't allow client to delete subreply which isn't theirs", async () => {
    // hover over component and search for 
    let {container} = render(
      <Provider store={store}>
        <SubReply {...props}/>
      </Provider>
    )

    // await for reply container and fire hover event
    let subreply = await findByTestId(container, "subreply")
    
    fireEvent.mouseEnter(subreply)
    
    let deleteButton = queryByTestId(subreply, "subreply-delete-icon")
    expect(deleteButton).not.toBeInTheDocument()
    
  })
  
  it("does allow client to delete subreply which is theirs", async () => {
    // hover over component and search for 
    let {container} = render(
      <Provider store={store}>
        <SubReply {...clientProps}/>
      </Provider>
    )

    // await for reply container and fire hover event
    let subreply = await findByTestId(container, "subreply")
    fireEvent.mouseEnter(subreply)
    
    let deleteButton = queryByTestId(subreply, "subreply-delete-icon")
    expect(deleteButton).toBeInTheDocument()

  })


})

describe("subreply reference types", () => {
  
  async function getReferenceOffProps(props){
    let {container} = render(
      <Provider store={store}>
        <SubReply {...props}/>
      </Provider>
    )

    // await for reply container and fire hover event
    try{
      let subreply = await findByTestId(container, "subreply")
      return getByTestId(subreply, "reply-to") 
    }
    catch(err){
      return null
    }
  }
  
  it("should not have a reply-to section if it isn't referencing a subcomment", async() => {
    let subreplyRef = await getReferenceOffProps(props) // using props which has reference type of "comment"
    expect(subreplyRef).not.toBeInTheDocument()
  })
  
  it("should have a reply-to section if it is referencing a subcomment", async() => {
    let subreplyRef = await getReferenceOffProps(refProps) // using props which has reference type of "subcomment"
    expect(subreplyRef).toBeInTheDocument()
  })

  it("should have correct reference content if referencing", async() => {
    let subreplyRef = await getReferenceOffProps(refProps)
    let refName = getByRole(subreplyRef, "reference-name")

    expect(refName.innerHTML).toEqual(refProps.info.username)
  })
  
  
})