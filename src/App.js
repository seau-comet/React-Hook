import React, { useState, useEffect, useRef } from "react";
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  addData,
  deleteData,
  editData,
  fetchData,
  fetchOne,
} from "./apiServices";

function App() {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [margin, setMargin] = useState("0px");
  const [lists, setLists] = useState({ status: false, data: [] });
  const [list, setList] = useState({});
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [update, setUpdate] = useState();
  const textRef = useRef();
  const toggle = () => {
    setModal(!modal);
  };
  const checkNote = async (e) => {
    e.preventDefault();
    setCancelLoading(true);
    var temp = await fetchOne(list.id);
    if (temp !== "failed") {
      setCancelLoading(false);
      if (temp[0].name !== list.text) {
        setUpdate(list);
      }
      setEdit(false);
    }
  };
  const editList = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    var temp = await editData(list.id, list.text);
    if (temp !== "failed") {
      // setUpdate(temp);
      setEditLoading(false);
      setEdit(false);
    }
  };
  const deleteList = async (e) => {
    e.preventDefault();
    var temp = await deleteData(list.id);
    if (temp !== "failed") {
      setUpdate(temp);
      setEdit(false);
    }
  };
  const addList = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    var res = await addData(textRef.current.value);
    if (res !== "failed") {
      setAddLoading(false);
      setUpdate(res);
      setModal(false);
    }
  };
  const fetchLists = async () => {
    var data = await fetchData();
    return data;
  };
  useEffect(() => {
    setLists({ status: false, data: [] });
    var temp = fetchLists();
    temp.then((data) => {
      setLists({ status: true, data: data });
    });
  }, [update]);
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-text">React Hook</span>
        {edit ? (
          <Button color="warning" className="text-white" onClick={checkNote}>
            {cancelLoading ? (
              <Spinner
                className="mr-2 white"
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            Cancel
          </Button>
        ) : (
          <Button color="success" onClick={toggle}>
            Add List
          </Button>
        )}
      </nav>
      <ul
        className="list-group list-group-flush"
        style={{ marginBottom: margin }}
      >
        {lists.data.length === 0 ? (
          lists.status === false ? (
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              empty list
            </div>
          )
        ) : (
          lists.data.map((value, index) => {
            return (
              <li
                key={index}
                className="list-group-item bg-light text-dark"
                suppressContentEditableWarning={true}
                contentEditable={true}
                placeholder="Double click for deleting"
                onFocus={(e) => {
                  e.preventDefault();
                  setEdit(true);
                  setList({
                    text: e.target.innerText,
                  });
                  setMargin("60px");
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  setList({
                    id: value._id,
                    text: e.target.innerText,
                  });
                }}
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                data-animation={false}
                data-container={true}
              >
                {value.name}
              </li>
            );
          })
        )}
      </ul>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Enter your list</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <textarea
              ref={textRef}
              className="form-control"
              placeholder="type something ..."
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addList}>
            {addLoading ? (
              <Spinner
                className="mr-2"
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {edit ? (
        <div style={{ backgroundColor: "gray" }}>
          <div
            className="bg.dark row align-items-center"
            style={{
              paddingBottom: "10px",
              position: "fixed",
              bottom: "0px",
              width: "100%",
              height: "50px",
              margin: "0px",
            }}
          >
            <div className="col">
              <Button color="danger" block onClick={deleteList}>
                Delete {list.text.length > 5 ? list.text.substr(0,4) :list.text}...
              </Button>
            </div>
            <div className="col">
              <Button color="primary" block onClick={editList}>
                {editLoading ? (
                  <Spinner
                    className="mr-2"
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : null}
                Edit
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
