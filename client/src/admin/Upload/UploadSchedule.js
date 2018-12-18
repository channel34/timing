import React from "react";
import CSVReader from "react-csv-reader";
import PreSubmitTable from "./PreSubmitTable";
import { addSchedule } from "../../services/server";
import { Button, Col, Row, Input, Form, FormGroup, Label } from "reactstrap";

class UploadSchedule extends React.Component {
  state = {
    csv: [],
    value2: "Title",
    value3: "Day",
    value4: "Location",
    value5: "StartTime",
    value6: "EndTime",
    transformedData: [],
    columnMap: {
      titleColumnIndex: 0,
      dayColumnIndex: 1,
      locationColumnIndex: 2,
      startTimeColumnIndex: 3,
      endTimeColumnIndex: 4
    },
    headerColumns: [],
    eventName: "",
    state: "",
    imageUrl: ""
  };
  componentDidMount() {}
  handleForce = datas => {
    this.setState({ csv: datas });
    let data = this.state.csv;
    var arrayOfObject = [];
    const changeToObject = data => {
      for (var i = 1; i < data.length; i++) {
        var json = {};
        json.title = data[i][this.state.columnMap.titleColumnIndex];
        json.day = data[i][this.state.columnMap.dayColumnIndex];
        json.location = data[i][this.state.columnMap.locationColumnIndex];
        json.startTime = data[i][this.state.columnMap.startTimeColumnIndex];
        json.endTime = data[i][this.state.columnMap.endTimeColumnIndex];
        arrayOfObject.push(json);
      }
      return arrayOfObject;
    };
    const transformedData = changeToObject(data);
    let headerColumns = Object.keys(arrayOfObject[0]);
    this.setState({
      transformedData,
      value2: headerColumns[0],
      value3: headerColumns[1],
      value4: headerColumns[2],
      value5: headerColumns[3],
      value6: headerColumns[4]
    });
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    console.log(this.state.transformedData);
    addSchedule({
      schedule: this.state.transformedData,
      eventName: this.state.eventName,
      state: this.state.state,
      imageUrl: this.state.imageUrl
    });
  };

  render() {
    const {
      value2,
      value3,
      value4,
      value5,
      value6,
      transformedData
    } = this.state;
    return (
      <React.Fragment>
        <Form>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label>Event Name</Label>
                <Input
                  type="text"
                  name="eventName"
                  placeholder="Event Name"
                  onChange={this.handleInputChange}
                  value={this.state.eventName}
                />
              </FormGroup>{" "}
            </Col>
            <CSVReader
              cssClass="csv-input"
              label="Select Schedule"
              onFileLoaded={this.handleForce}
              onError={this.handleError}
              inputId="Event"
              inputStyle={{ color: "green" }}
            />
          </Row>
          <Row form>
            <Col md={1}>
              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="state"
                  placeholder="Location"
                  onChange={this.handleInputChange}
                  value={this.state.state}
                  maxLength="2"
                />
              </FormGroup>{" "}
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Image Url</Label>
                <Input
                  type="text"
                  name="imageUrl"
                  placeholder="Image Url"
                  onChange={this.handleInputChange}
                  value={this.state.imageUrl}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <PreSubmitTable
          value2={value2}
          value3={value3}
          value4={value4}
          value5={value5}
          value6={value6}
          csv={transformedData}
          onhandleImportCSV={this.onhandleImportCSV}
        />

        <Button type="submit" onClick={this.handleSubmit}>
          Upload
        </Button>
      </React.Fragment>
    );
  }
}

export default UploadSchedule;
