import React from "react"
import ReactDOM from "react-dom"
import { findByTestId, fireEvent, getByRole, queryByTestId, render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"

import SubReply from "../../../components/Content/ContentHome/ContentSubReply"

import {mockAuthor, mockSubreply, mockReply, mockClient, mockClientSubreply, loadedImages} from "../../mockVars.js"

// creates mock client to be working with the componenet
const mockStore = configureStore([])
var store;
beforeEach(() => {
  store = mockStore({
    clientInfo: {value: {payload: mockClient}}
  })
})

describe("content subreply", () => {
  it("renders without crashing", async () => {
    let {container} = render(
      <Provider store={store}>
        <SubReply info={mockSubreply} parentInfo={mockReply} loadedImages={loadedImages}/>
      </Provider>
    )

    let subreply = await findByTestId(container, "subreply")
    getByRole(container, "")
  })
})