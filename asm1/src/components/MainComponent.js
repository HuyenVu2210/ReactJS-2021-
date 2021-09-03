import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import StaffList from "./StaffListComponent";
import Staff from "./StaffComponent";
import Header from "./HeaderComponent";
import DepList from "./DepartmentComponent";
import Footer from "./FooterComponent";
import SalaryList from "./SalaryList";
import Error from "./ErrorComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
      staffSelected: null,
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const data = localStorage.getItem("Staffs");
    if (data) {
      this.setState({ staffs: JSON.parse(data) });
    } else {
      localStorage.setItem("Staffs", JSON.stringify(STAFFS));
    }
  }

  updateState(staff) {
    const currentStaffs = this.state.staffs;
    this.setState({
      staffs: currentStaffs.concat([staff]),
    });
    localStorage.setItem("Staffs", JSON.stringify(currentStaffs.concat([staff])));
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <Staff
          staffSelected={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
          department={this.state.departments}
        />
      );
    };

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <StaffList
                  staffs={this.state.staffs}
                  departments={this.state.departments}
                  updateState={(newStaff) => this.updateState(newStaff)}
                />
              )}
            />
            <Route path="/staff/:id" component={StaffWithId} />
            <Route
              path="/departments"
              component={() => <DepList departments={this.state.departments} />}
            />
            <Route
              path="/salarylist"
              component={() => <SalaryList staffs={this.state.staffs} />}
            />
            <Route path="*" component={Error} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
