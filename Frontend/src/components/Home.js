import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import { Link, useParams } from 'react-router-dom'
import Product from './product/Product'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Filter from './layouts/Filter'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'



const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);



const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [display, setDisplay] = useState('none');
  const [catogry, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const alert = useAlert();
  const { loading, products, error, productCount, resPerPage, filterProductCount } = useSelector(state => state.products);
  const { keyword } = useParams();
  // console.log(keyword+"+++++")
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, catogry, ratings));





  }, [dispatch, error, currentPage, catogry, price, keyword, ratings])


  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);

  }
  let count = productCount
  if (keyword || catogry || ratings !== 0) {
    count = filterProductCount;
  }
  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>
          <MetaData title={'Buy Best Products Online'} />
          <section id="products" className="container mt-5">
            <div className={`row productList`}>


              <Fragment>
                <Filter setCategory={setCategory} setRatings={setRatings} setPrice={setPrice} selected={catogry} />
                <div className='col-6 col-md-9 productsDiv'>
                  <div className='row' >
                    {products && products.map(product => (
                      <Product key={product._id} product={product} />
                    ))

                    }
                  </div>
                </div>

              </Fragment>


            </div>
          </section>
          {resPerPage <= count && (
            <div className='d-flex justify-content-center mt-5'>

              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass='page-link'
              />
            </div>
          )}

        </Fragment>}





    </Fragment>
  )
}

export default Home






// <div class="hamburger-menu" onClick={toggleMenu}>
// <div class="bar"></div>
// <div class="bar"></div>
// <div class="bar"></div>
// </div>
// <div  style={{ display: `${display}` }} >
// <div className='px-5'>
//   <Range
//     marks={{
//       1: `$1`,
//       10000: `$10000`
//     }}
//     min={1}
//     max={10000}
//     defaultValue={[1, 10000]}
//     tipFormatter={value => `$${value}`}
//     tipProps={{
//       placement: "top",
//       visible: true
//     }}
//     value={price}
//     onChange={price => setPrice(price)}
//   />
// </div>
// </div>