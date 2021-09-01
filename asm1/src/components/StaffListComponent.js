import React, { useEffect, useState } from "react";
import { Card, CardImg, CardText, Form, Input, Button, Modal, ModalBody, ModalHeader, FormGroup, Label, Col, Row, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";

const StaffList = ({staffs}) => {

    // set state for name & search for search function
    const [Name, setName] = useState(null);
    const [SEARCH, setSEARCH] = useState(null);

    // set state to toggle add modal
    const [modalOpen, setModalOpen] = useState(false);

    // set state for new staff
    const [New, setNew] = useState({
      name: '',
      doB: '',
      startDate: '',
      department: '',
      salaryScale: '',
      annualLeave: '',
      overTime: '',
    });

    // set state for touch
    const [touched, settouched] = useState({
      name: false,
      doB: false,
      startDate: false,
      department: false,
      salaryScale: false,
      annualLeave: false,
      overTime: false,
    });

    // test
    useEffect(() => {
      console.log(error)
    })

    // render full staff list
    const STAFFS = staffs.map((staff) => {
      return (
        <Link
          to={`/staff/${staff.id}`}
          className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
          style={{ textDecoration: "none" }}
        >
          <div key={staff.id}>
            <Card
              tag="li"
              className="mt-2 p-1"
            >
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
      const X = staffs.filter((staff) => {
        if (name === "") {
          return staff
        } else if (staff.name.toLowerCase().includes(name.toLowerCase())){
          return staff
        }
      }).map((staff) => {
        return (
          <Link
          to={`/staff/${staff.id}`}
          className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
          style={{ textDecoration: "none" }}
        >
          <div key={staff.id}>
            <Card
              tag="li"
              className="mt-2 p-1"
            >
              <CardImg src={staff.image}></CardImg>
              <CardText>{staff.name}</CardText>
            </Card>
          </div>
        </Link>
        );
      })
      setSEARCH(X);
    }

    // handle add submit
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(New);
      alert(JSON.stringify(New))

      const newStaff = {
        id: staffs.length,
        name: New.name,
        doB: New.doB,
        startDate: New.startDate,
        department: New.department,
        salaryScale: New.salaryScale,
        annualLeave: New.annualLeave,
        overTime: New.overTime,
        image: '/assets/images/alberto.png'
      }

      staffs.push(newStaff);
      console.log(staffs, newStaff);
      setModalOpen(!modalOpen)
    }

    // form validation

    const validate = (name, doB, startDate, department, salaryScale, annualLeave, overTime) => {
      const error = {
        name: '',
        doB: '',
        startDate: '',
        department: '',
        salaryScale: '',
        annualLeave: '',
        overTime: ''
      }

      if (touched.name) {
        error.name = 'Yeu cau nhap'
      }

      if (touched.doB) {
        error.doB = 'Yeu cau nhap'
      }

      if (touched.startDate) {
        error.startDate = 'Yeu cau nhap'
      }

      if (touched.department) {
        error.department = 'Yeu cau nhap'
      }

      if (touched.salaryScale) {
        error.salaryScale = 'Yeu cau nhap'
      }

      if (touched.annualLeave) {
        error.annualLeave = 'Yeu cau nhap'
      }

      if (touched.salaryScale) {
        error.overTime = 'Yeu cau nhap'
      }

      return error;
    } 

    const error = validate(New.name, New.doB, New.startDate, New.department, New.salaryScale, New.annualLeave, New.overTime);

    // return part
    return (
      <div className="container">
        <h1 className="pb-3 text-dark">Danh sách nhân viên</h1>

        {/* hide message when there is no search results */}
        <p>
          {SEARCH === null
            ? "* Bấm vào tên nhân viên để xem thông tin."
            : SEARCH.length === 0
            ? ""
            : "* Bấm vào tên nhân viên để xem thông tin."}
        </p>

        <Button className="btn btn-primary" onClick={() => setModalOpen(!modalOpen)} >+</Button>
        <div>

          {/* search form */}
          <Form row>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Nhập tên nhân viên"
              innerRef={(input) => {return setName(input)}}
              style={{ display: "inline-block", "margin-left": "2vw" }}
            ></Input>
            <Button 
              type="submit"
              onClick={(event) => handleSearch(event, Name)}
              style={{ display: "inline-block" }}
            >
              Tìm
            </Button>
          </Form>
        </div>
  
        {/* Return full staffs list if user has not performed search, return message if there is no search results, return results if there is results */}
        <div className="row">
          {SEARCH === null
            ? STAFFS
            : SEARCH.length == 0
            ? "Không tìm thấy nhân viên nào"
            : SEARCH}
        </div>

        <div>
        <Modal isOpen={modalOpen} toggle={(modalOpen) => setModalOpen(!modalOpen)} >
            <ModalHeader isOpen={modalOpen} toggle={(modalOpen) => setModalOpen(!modalOpen)}>Thêm nhân viên</ModalHeader>
            <ModalBody>
              <Form onSubmit={(values) => handleSubmit(values)}>
                <Row>
                  <Label htmlFor="name" md={2}>Ten nhan vien</Label>
                  <Col md={10}>
                    <Input type="text" id="name" name="name" value={New.name} onChange={(event) => {return setNew({...New, name: event.target.value})}} onBlur={(touched) => {return settouched({...touched, name:true})}}></Input>
                    <p className="text-danger">{error.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor="doB" md={2}>Ngay sinh</Label>
                  <Col md={10}>
                    <Input type="date" id="doB" name="doB" value={New.doB} onChange={(event) => {return setNew({...New, doB: event.target.value})}} onBlur={(touched) => {return settouched({...touched, doB:true})}}></Input>
                    <p className="text-danger">{error.doB}</p>
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor="startDate" md={2}>Ngay bat dau</Label>
                  <Col md={10}>
                    <Input type="date" id="startDate" name="startDate" value={New.startDate} onChange={(event) => {return setNew({...New, startDate: event.target.value})}} onBlur={(touched) => {return settouched({...touched, startDate:true})}}></Input>
                    <p className="text-danger">{error.startDate}</p>
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor="department" md={2}>Phong ban</Label>
                  <Col md={10}>
                    <Input type="select" id="department" name="department" value={New.department} onChange={(event) => {return setNew({...New, department: event.target.value})}} onBlur={(touched) => {return settouched({...touched, department:true})}}>
                      <option>Sales</option>
                      <option>HR</option>
                      <option>Marketing</option>
                      <option>IT</option>
                      <option>Finance</option>
                    </Input>
                  </Col>
                  <p className="text-danger">{error.department}</p>
                </Row>
                <Row>
                  <Label htmlFor="salaryScale" md={2}>He so luong</Label>
                  <Col md={10}>
                    <Input type="text" id="salaryScale" name="salaryScale" value={New.salaryScale} onChange={(event) => {return setNew({...New, salaryScale: event.target.value})}} onBlur={(touched) => {return settouched({...touched, salaryScale:true})}}></Input>
                    <p className="text-danger">{error.salaryScale}</p>
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor="annualLeave" md={2}>Nghi phep</Label>
                  <Col md={10}>
                    <Input type="text" id="annualLeave" name="annualLeave" value={New.annualLeave} onChange={(event) => {return setNew({...New, annualLeave: event.target.value})}} onBlur={(touched) => {return settouched({...touched, annualLeave:true})}}></Input>
                    <p className="text-danger">{error.annualLeave}</p>
                  </Col>
                </Row>
                <Row>
                  <Label htmlFor="overTime" md={2}>Lam them gio</Label>
                  <Col md={10}>
                    <Input type="text" id="overTime" name="overTime" value={New.overTime} onChange={(event) => {return setNew({...New, overTime: event.target.value})}} onBlur={(touched) => {return settouched({...touched, overTime:true})}}></Input>
                    <p className="text-danger">{error.overTime}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={10}>
                    <Button md={2}>Them</Button>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
        </Modal>
        </div>
      </div>
    );
  }

export default StaffList;
