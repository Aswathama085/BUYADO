import {React , Fragment} from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useDispatch,useSelector} from "react-redux";

const ProductDetails = (product) => {
    return (
        <Fragment>
            <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images && product.images.map((item,i) => {
                        <img 
                            className="CarouselImage" 
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}

                        />
                    })}

                </Carousel>
            </div>


            </div>

        </Fragment>
    )
}

export default ProductDetails
