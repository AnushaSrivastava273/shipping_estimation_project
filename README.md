# E-Commerce Shipping Charge Estimator

## Overview
This is a simple B2B e-commerce shipping charge estimator built with **Node.js, Express, and TypeScript**. It calculates shipping costs for Kirana stores based on distance and transport mode.

### Entities Modeled
- **Customer:** Kirana stores with location.
- **Seller:** Sellers with their location.
- **Product:** Products with attributes like weight and dimensions.
- **Warehouse:** Warehouses where products are dropped off and shipped from.

## Setup & Running the Application

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
   *The server will run on `http://localhost:3000`*

### Testing
Run unit tests with Jest:
```sh
npm test
```

## APIs

### 1. Get Nearest Warehouse
**GET** `/api/v1/warehouse/nearest?sellerId={id}&productId={id}`

Returns the nearest warehouse for a given seller to drop off a product.

### 2. Get Shipping Charge
**GET** `/api/v1/shipping-charge?warehouseId={id}&customerId={id}&deliverySpeed={standard|express}`

Returns the shipping charge based on distance from the warehouse to the customer, and the transport mode. *Note: If a specific product cart isn't supplied, defaults to a 1kg weight calculation as a base figure.*

### 3. Calculate Combined Shipping
**POST** `/api/v1/shipping-charge/calculate`
```json
{
  "sellerId": "123",
  "customerId": "456",
  "deliverySpeed": "express"
}
```
Returns the combined result of the nearest warehouse and the total shipping charge for the drop-off and delivery.

## Design Patterns & Extensibility
- **Service Layer Pattern:** Business logic (distance calculation, shipping cost mapping) is separated into `services` distinct from `controllers`. This makes it easy to mock logic during unit tests.
- **Separation of Concerns:** Distinct files for `entities`, `data`, `utils`, `services`, and `controllers`.
- **In-Memory Store:** The `src/data/datastore.ts` file manages all records, which can be effortlessly swapped out for an actual DB implementation using an Interface/Repository pattern later.

## Exception Handling
All APIs manage invalid inputs gracefully. Try hitting routes without necessary parameters or invalid entity IDs, and the server will accurately respond with a `400 Bad Request` or `404 Not Found` along with a clear error payload.
