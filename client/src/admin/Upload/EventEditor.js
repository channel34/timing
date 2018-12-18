import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Row, Img, Input, Form, FormGroup, Label } from "reactstrap";
import { getById, updateEvent } from "../../services/server";

class EventEditor extends React.Component {
  state = {
    event: {
      id: "",
      eventName: "",
      state: "",
      imageUrl: ""
    },

    modal: false
  };
  componentDidMount() {
    getById(this.props.id).then(res => {
      this.setState({ event: res.data });
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  updateEventInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(state => ({
      event: {
        ...state.event,
        [name]: value
      }
    }));
  };

  handleUpdate = () => {
    const { event } = this.state;
    updateEvent(event, event.id).then(this.toggle);
  };

  render() {
    const { event } = this.state;
    return (
      <React.Fragment>
        <div>
          <Button color="primary" onClick={this.toggle}>
            Edit
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Edit {event.eventName}
            </ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col md={5}>
                    <FormGroup>
                      <Label>Event Name</Label>
                      <Input
                        type="text"
                        name="eventName"
                        placeholder="Event Name"
                        onChange={this.updateEventInput}
                        value={event.eventName}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <FormGroup>
                      <Label>Location</Label>
                      <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        onChange={this.updateEventInput}
                        value={event.state}
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
                        onChange={this.updateEventInput}
                        value={event.imageUrl}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <img
                style={{
                  height: "200px",
                  width: "175px",
                  alignContent: "center"
                }}
                src={event.imageUrl}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleUpdate}>
                Confirm
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default EventEditor;
