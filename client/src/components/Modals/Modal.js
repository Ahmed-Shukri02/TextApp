import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Buttons from "../Buttons/Buttons";
import { useSelector, useDispatch } from "react-redux";
import { setModalStatus } from "../../Tools/modalStatus";
import "./modal.css"
import "./modal_content.css"
import IconComponents from "../../icon-components/icon-components";

export default function Modal({children, modalID, onUnmount = () => ""}){
  const dispatch = useDispatch()
  const modalStatus = useSelector((state) => state.modalStatus.value)

  useEffect(() => {

    return () => onUnmount()
  }, [])

  if(!modalStatus?.payload || modalStatus.payload != modalID) return null
  console.log(modalStatus)


  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-header">
          <button className="modal-close" onClick={() => dispatch(setModalStatus(false))}>
            <IconComponents.CloseIcon color="lightslategray" iconClass="modal-close-icon"/>
          </button>
        </div>

        <div className="modal-content">
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}