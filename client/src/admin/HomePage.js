import React from "react";
import {
  CardBody,
  CardTitle,
  CardText,
  Card,
  CardImg,
  Input,
  Button,
  Col,
  Row
} from "reactstrap";
import { search, deleteEvent } from "../services/server";
import EventEditor from "./Upload/EventEditor";
import EventCarousel from "./EventCarousel";

class HomePage extends React.Component {
  state = {
    searchValue: "",
    pageSize: 15,
    pageIndex: 0,
    searchData: null
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  handleSearch = () => {
    const { searchValue, pageSize, pageIndex } = this.state;
    search(pageIndex, pageSize, searchValue).then(res =>
      this.setState({ searchData: res.data })
    );
  };

  handleDelete = id => {
    deleteEvent(id);
  };
  render() {
    const { searchData } = this.state;
    return (
      <React.Fragment>
        <div style={{ height: "300px", width: "200px" }}>
          <div> Upcoming Events</div>
          {searchData && <EventCarousel events={searchData} />}
        </div>
        <div>Search Events</div>
        <Row>
          <Col md={3}>
            <Input
              onChange={this.handleInputChange}
              value={this.state.searchValue}
              name="searchValue"
              type="text"
            />
          </Col>
          <Button onClick={this.handleSearch} color="primary">
            Search
          </Button>
        </Row>
        <div className="resultContainer">
          {searchData && (
            <div>
              {" "}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr"
                }}
              >
                {searchData.map(event => (
                  <Card
                    key={event.id}
                    className="card px-1 py-1 my-1 border-left border-primary border-1 "
                  >
                    <CardBody>
                      <CardTitle>{event.eventName}</CardTitle>
                      <CardImg src={event.imageUrl} />
                      <CardText>Location: {event.state}</CardText>
                      <CardText>Description : Coming soon </CardText>{" "}
                      <Row>
                        <EventEditor id={event.id} />
                        <Button
                          onClick={() => this.handleDelete(event.id)}
                          color="danger"
                        >
                          Delete
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
