import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
  };

  //this notation of making the event handler an arrow function bypasses having to '.bind(this)'.
  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };
  /* handleIndexClick(e) {
    this.setState({
      active: 0 + e.target.dataset.index,
      //above comes back as string, needs to be a number
      //prefix the e.target with a '+' or '0+e.target'
      //to come back as a number
    });
  }
*/
  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={index}
              onClick={this.handleIndexClick}
              //old way below
              //onClick={this.handleIndexClick.bind(this)}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
