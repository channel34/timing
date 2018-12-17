import React from "react";
import {
  CardBody,
  CardTitle,
  CardText,
  Card,
  CardImg,
  Input,
  Button
} from "reactstrap";
import { search } from "../services/server";

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
  render() {
    const { searchData } = this.state;
    return (
      <React.Fragment>
        <div>Search Events</div>
        <Input
          onChange={this.handleInputChange}
          value={this.state.searchValue}
          name="searchValue"
          type="text"
        />
        <Button onClick={this.handleSearch} color="primary">
          Search
        </Button>
        <div className="resultContainer">
          {searchData && (
            <div>
              {searchData.map(event => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr"
                  }}
                >
                  <Card
                    key={event.id}
                    className="card px-1 py-1 my-1 border-left border-primary border-1 "
                  >
                    <CardImg src={event.imageUrl} />
                    <CardBody>
                      <CardTitle>{event.eventName}</CardTitle>
                      <CardText>{event.state}</CardText>
                      <CardText />{" "}
                      <Button
                        color="info"
                        onClick={() => this.handleEditClicked(event.id)}
                      >
                        Edit
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              ))}{" "}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
