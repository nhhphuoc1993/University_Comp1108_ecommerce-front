import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact";
import slider1 from "./../utilities/imgs/img5.jpg";
import slider2 from "./../utilities/imgs/img4.jpg";
import slider3 from "./../utilities/imgs/img3.jpg";

const Carousel = () => {
    return (
        <MDBCarousel
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
            slide
        >
            <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src={slider1}
                            alt="First slide"
                            style={{ height: "650px" }}
                        />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src={slider2}
                            alt="Second slide"
                            style={{ height: "650px" }}
                        />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src={slider3}
                            alt="Third slide"
                            style={{ height: "650px" }}
                        />
                    </MDBView>
                </MDBCarouselItem>
            </MDBCarouselInner>
        </MDBCarousel>
    );
};

export default Carousel;
