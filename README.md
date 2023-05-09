# HomeShop
# Ecommerce Website

This is an ecommerce website built using the MERN stack with integrated payment gateway and email sending capabilities.

## Features

- User authentication and authorization
- User can browse through various products
- User can add products to cart and checkout
- Integrated payment gateway for secure transactions
- Email notifications for order confirmation and shipping updates

## Installation

1. Clone the repository
   ```
   git clone https://github.com/<username>/ecommerce.git
   ```
2. Install dependencies
   ```
   cd ecommerce
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables
   ```
   PORT=<port number>
   MONGODB_URI=<MongoDB URI>
   SECRET=<session secret>
   STRIPE_SECRET_KEY=<Stripe secret key>
   EMAIL_USER=<sender email>
   EMAIL_PASS=<sender password>
   ```
4. Start the server
   ```
   npm start
   ```
5. Open `http://localhost:<port number>` in your browser

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- Stripe API
- Nodemailer

## Credits

This website was built by Dhruv.
