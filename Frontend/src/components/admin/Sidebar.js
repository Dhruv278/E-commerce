import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (

        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false"
                            className="dropdown-toggle DashBoardListItem"><i className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products" style={{textAlign:'left'}}><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product" style={{textAlign:'left'}}><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders" className='DashBoardListItem'><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users" className='DashBoardListItem'><i className="fa fa-users"></i> Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews" className='DashBoardListItem'><i className="fa fa-star"></i> Users</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar