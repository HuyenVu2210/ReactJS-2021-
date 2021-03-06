import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from "./LoadingComponent";

// form validation 
const required = (value) => value && value.length > 0 ;
const maxlength = (len) => (value) => !(value) || (value.length <= len);
const isNumber = (value) => !(value) ||!isNaN(Number(value));

const StaffList = ({ staffs, postStaff, isLoading, errMes }) => {
  // set state for name & search for search function
  const [Name, setName] = useState(null);
  const [SEARCH, setSEARCH] = useState(null);

  // set state for doB & startDate
  const [doB, setdoB] = useState('');
  const [startDate, setstartDate] = useState('');

  // set state to toggle add modal
  const [modalOpen, setModalOpen] = useState(false);

  // render full staff list
  const STAFFS = staffs.map((staff) => {
    return (
      <Link
        to={`/staff/${staff.id}`}
        className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
        style={{ textDecoration: "none" }}
        key={staff.id}
      >
        <div key={staff.id}>
          <Card tag="li" className="mt-2 p-1">
            <CardImg src={staff.image}></CardImg>
            <CardText>{staff.name}</CardText>
          </Card>
        </div>
      </Link>
    );
  });

  // render search by name results
  const handleSearch = (event, Name) => {
    event.preventDefault();
    const name = Name.value;
    const X = staffs
      .filter((staff) => {
        if (name === "") {
          return staff;
        } else {
          if (staff.name.toLowerCase().includes(name.toLowerCase())) {
          return staff;
          }
        }
      })
      .map((staff) => {
        return (
          <Link
            to={`/staff/${staff.id}`}
            className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
            style={{ textDecoration: "none" }}
            key={staff.id}
          >
            <div key={staff.id}>
              <Card tag="li" className="mt-2 p-1">
                <CardImg src={staff.image}></CardImg>
                <CardText>{staff.name}</CardText>
              </Card>
            </div>
          </Link>
        );
      });
    setSEARCH(X);
    Name.value = "";
  };

  // handle add submit
   const handleSubmit = (values) => {

    setModalOpen(!modalOpen);

    const isoDate = new Date().toISOString();
    const newTime = isoDate.slice(10);
    const timedDoB = doB !== '' ? doB.concat(newTime) : null;
    const timedStartDate = startDate !== '' ? startDate.concat(newTime) : null;

    postStaff(values.name, timedDoB, timedStartDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime)
   };

  // return part
  return (
    <div className="container">
      <h1 className="pb-3 text-dark">Danh s??ch nh??n vi??n</h1>

      <div className="row mb-1">
        {/* Add new button */}
        <div className="col-md-1 mt-1">
          <Button
            className="btn btn-primary"
            onClick={() => setModalOpen(!modalOpen)}
          >
            +
          </Button>
        </div>

        {/* Seach form */}
        <div className="col-md-8">
          <form className="form-inline">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nh???p t??n nh??n vi??n"
              ref={(input) => {
                return setName(input);
              }}
              className="form-control mr-2 mb-1 mt-1"
            ></input>
            <button
              type="submit"
              onClick={(event) => handleSearch(event, Name)}
              className="btn btn-info"
            >
              T??m
            </button>
          </form>
        </div>
      </div>

      <div>
        {/* hide message when there is no search results */}
        <p>
          {SEARCH === null
            ? "* B???m v??o t??n nh??n vi??n ????? xem th??ng tin."
            : SEARCH.length === 0
            ? ""
            : "* B???m v??o t??n nh??n vi??n ????? xem th??ng tin."}
        </p>
      </div>

      {/* Return full staffs list if user has not performed search, return message if there is no search results, return results if there is results */}
      <div className="row">
        {isLoading ? <Loading /> 
          : (errMes != null) ? errMes 
          : SEARCH === null ? STAFFS
          : SEARCH.length === 0 ? "Kh??ng t??m th???y nh??n vi??n n??o"
          : SEARCH} 
      </div>

      {/* Modal */}

      <div>
        <Modal
          isOpen={modalOpen}
          toggle={(modalOpen) => setModalOpen(!modalOpen)}
        >
          <ModalHeader
            isOpen={modalOpen}
            toggle={(modalOpen) => setModalOpen(!modalOpen)}
          >
            Th??m nh??n vi??n
          </ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Row className="mt-2">
                <Label htmlFor="name" md={3}>
                  T??n nh??n vi??n
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    validators={{ required, maxLength: maxlength(15) }}
                  ></Control.text>
                  <Errors
                    model=".name"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      required: "Y??u c???u nh???p.",
                      maxLength: "H??y nh???p d?????i 15 k?? t???.",
                    }}
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="doB" md={3}>
                  Ng??y sinh
                </Label>
                <Col md={9}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={doB}
                    onChange={(event) => {
                      return setdoB(event.target.value);
                    }}
                  ></Input>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="startDate" md={3}>
                  Ng??y b???t ?????u
                </Label>
                <Col md={9}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(event) => {
                      return setstartDate(event.target.value);
                    }}
                  ></Input>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="departmentId" md={3}>
                  Ph??ng ban
                </Label>
                <Col md={9}>
                  <Control.select
                    model=".departmentId"
                    id="departmentId"
                    name="departmentId"
                    className="form-control"
                    defaultValue="Dept01"
                  >
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="salaryScale" md={3}>
                  H??? s??? l????ng 
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    validators={{ required, isNumber }}
                  ></Control.text>
                  <Errors
                    model=".salaryScale"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      required: "Y??u c???u nh???p.",
                      isNumber: "H??y nh???p s???.",
                    }}
                    className="text-danger"
                  ></Errors>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="annualLeave" md={3}>
                  Ngh??? ph??p
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    validators={{ required, isNumber }}
                  ></Control.text>
                  <Errors
                    model=".annualLeave"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      required: "Y??u c???u nh???p.",
                      isNumber: "H??y nh???p s???.",
                    }}
                    className="text-danger"
                  ></Errors>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="overTime" md={3}>
                  L??m th??m gi???
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    validators={{ required, isNumber }}
                  ></Control.text>
                  <Errors
                    model=".overTime"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      required: "Y??u c???u nh???p.",
                      isNumber: "H??y nh???p s???.",
                    }}
                    className="text-danger"
                  ></Errors>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={{ size: 3, offset: 3 }}>
                  <Button type="submit" className="btn btn-info">
                    Th??m
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default StaffList;
