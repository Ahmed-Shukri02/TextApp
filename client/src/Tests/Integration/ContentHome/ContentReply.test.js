import React from "react"
import ReactDOM from "react-dom"
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"

import ContentReply from "../../../components/Content/ContentHome/ContentReply"

import {mockAuthor, mockReply, mockClient, mockClientReply} from "../../mockVars.js"

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
        <ContentReply info={mockReply} userInfo={mockAuthor}/>
      </Provider>
    )

  })

})