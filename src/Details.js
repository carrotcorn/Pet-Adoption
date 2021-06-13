import { Component } from "react";
import { withRouter } from "react-router-dom";

import Carousel from "./Carousel";
import Modal from "./Modal";

import ErrorBoundary from "../ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  /*normal React Class component notation
  constructor() {
    super();

     this.state = { loading: true };
 } */
  /* below, babel plugin in the '.babelrc'.  -    

"plugins":[
     "@babel/plugin-proposal-class-properties" 
   ]

  - allows for setting the state like this in class components instate of
   writing "super(), erc."
_________________________________________________ */
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
    //////// EDUCATIONAL CODE BELOW **********
    // this.setState({
    //    loading: false,
    //    name:json.pets[0].name,
    //    breed:json.pets[0].breed,
    //    description:json.pets[0].description,
    //       //etc. this is the long way of setting state for the object.
    //       //instead of every value of the object being set one at a time
    //       //object.assign() does this with just two lines of code
    // });
  }

  toggleModal = () => this.setState({ showModal: !this.setState.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    //   console.log(this.state);
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;

    //  throw new Error("test ErrorBoundary");

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          {/* below is how to use context in class components */}
          <ThemeContext.Consumer>
            {([themeHook]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: themeHook }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
             showModal ? (
                <Modal>
                   <div>
                      <h1>Would you like to adopt {name}?</h1>
                      <div className="buttons">
                         <button onClick={this.adopt}>Yes</button>
                         <button onClick={this.toggleModal}>No, I dont want this animal in my life</button>
                      </div>
                   </div>
                </Modal>
             )
          }
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
