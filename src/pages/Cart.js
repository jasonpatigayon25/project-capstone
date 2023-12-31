import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Cart.css';


const Cart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((selectedItem) => selectedItem.id !== item.id));
    }
    event.target.disabled = true;
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  };

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
    // function for vouchers
    setDiscount("");
  };


  const items = [
    {
      id: 1,
      name: 'Product 1',
      price: 'Php 100.00',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 'Php 75.50',
      quantity: 2,
    }, //SAMPLE CART ITEMS
  ];

  const calculateAmount = () => {
    if (selectedItems.length === 0) {
      return 'Php 0.00';
    }

    let totalAmount = 0;
    selectedItems.forEach((item) => {
      const price = parseFloat(item.price.substring(4));
      totalAmount += price * item.quantity;
    });

    return `Php ${totalAmount.toFixed(2)}`;
  };

  return (
    <div className="cart">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#E3FCE9' }}>
        <img
          src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
          width="240"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: '50px' }}
        />
        <div className="container">
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '600px', borderColor: '#05652D' }}
            />
            <button className="btn" type="submit" style={{ borderColor: '#05652D' }}>
              <img
                src={process.env.PUBLIC_URL + '/search-icon.png'}
                alt="Search"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 4 ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              />
            </button>
          </form>
          <button className="btn" type="submit" style={{ borderColor: 'transparent' }}>
            <Link to="/cart">
              <img
                src={process.env.PUBLIC_URL + '/shopping-cart.png'}
                alt="Cart"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 3 ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          </button>
          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + '/home.png'}
                      alt="Home"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 0 ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onMouseEnter={() => handleMouseEnter(0)}
                      onMouseLeave={handleMouseLeave}
                    />
                    Home
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + '/notification.png'}
                      alt="notif"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 1 ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onMouseEnter={() => handleMouseEnter(1)}
                      onMouseLeave={handleMouseLeave}
                    />
                    Notification
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle
                    className="nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={process.env.PUBLIC_URL + '/settings.png'}
                        alt="Option"
                        className="nav-icon"
                        style={{
                          transform: hoveredIndex === 2 ? 'scale(1.1)' : 'scale(1)',
                        }}
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/change-account">Change Account</Dropdown.Item>
                    <Dropdown.Item href="/change-password">Change Password</Dropdown.Item>
                    <Dropdown.Item href="/language">Language</Dropdown.Item>
                    <Dropdown.Item href="/help">Help</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ marginTop: '100px' }}>
          Shopping Cart
        </h2>

        {items.length > 0 ? (
          <div>
            {items.map((item) => (
              <Card className="mb-3 shadow" key={item.id}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <Card.Img
                      src={`product${item.id}.jpg`}
                      alt={`Product ${item.id}`}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>Price: {item.price}</Card.Text>
                      <Card.Text>Quantity: {item.quantity}</Card.Text>
                      <Button variant="danger" className="remove-button">
                        Remove
                      </Button>
                      <Form.Check
                        type="checkbox"
                        className="position-absolute top-50 start-50 translate-middle"
                        checked={selectedItems.includes(item)}
                        onChange={(e) => handleCheckboxChange(e, item)}
                      />
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="empty-cart text-center">
            <p>Your cart is empty.</p>
          </div>
        )}

        <div className="detail-form mt-4">
          <Form.Group controlId="voucherCode">
            <Form.Label>ECO-lover Voucher</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Code"
              value={voucherCode}
              onChange={handleVoucherCodeChange}
            />
          </Form.Group>

          <Form.Group controlId="selectedItems">
            <Form.Label>Item/s Selected</Form.Label>
            <Form.Control type="text" value={selectedItems.length} readOnly />
          </Form.Group>

          <Form.Group controlId="discount">
            <Form.Label>Discounts</Form.Label>
            <Form.Control type="text" value={discount} readOnly />
          </Form.Group>

          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" value={calculateAmount()} readOnly />
          </Form.Group>
        </div>

        <Form.Group controlId="selectAll">
          <Form.Check
            type="checkbox"
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          style={{ backgroundColor: '#05652D', borderColor: '#05652D'}}
          >
          Check Out
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;