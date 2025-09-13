# Dashboard API Documentation

## Base URL

All API endpoints are prefixed with: `http://localhost:4000/api`

## Customers

### Get All Customers

**Endpoint:** `GET /customers`

**Example:**

```bash
curl http://localhost:4000/api/customers
```

### Create a New Customer

**Endpoint:** `POST /customers`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Example:**

```bash
curl -X POST http://localhost:4000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## Products

### Get All Products

**Endpoint:** `GET /products`

**Example:**

```bash
curl http://localhost:4000/api/products
```

### Get Product by ID

**Endpoint:** `GET /products/:id`

**Parameters:**

- `id` - Product ID (MongoDB ObjectId)

**Example:**

```bash
curl http://localhost:4000/api/products/68c58bc3fa23c80b769a9add
```

### Create a New Product

**Endpoint:** `POST /products`

**Request Body:**

```json
{
  "name": "New Product",
  "price": 99.99,
  "description": "Product description"
}
```

**Example:**

```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","price":99.99,"description":"Product description"}'
```

## Orders

### Get All Orders

**Endpoint:** `GET /orders`

**Example:**

```bash
curl http://localhost:4000/api/orders
```

### Create a New Order

**Endpoint:** `POST /orders`

**Request Body:**

```json
{
  "customerId": "68c58bc2fa23c80b769a9ad8",
  "items": [
    {
      "productId": "68c58bc3fa23c80b769a9ade",
      "quantity": 1
    }
  ]
}
```

**Example:**

```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId":"68c58bc2fa23c80b769a9ad8","items":[{"productId":"68c58bc3fa23c80b769a9ade","quantity":1}]}'
```

## Reports

### Get Product Quantities for Customer

**Endpoint:** `GET /reports/customer/:customerId/product-quantities`

**Parameters:**

- `customerId` - Customer ID (MongoDB ObjectId)

**Example:**

```bash
curl http://localhost:4000/api/reports/customer/68c58bc2fa23c80b769a9ad8/product-quantities
```

## Notes

- All IDs used in the API are MongoDB ObjectIds (e.g., `68c58bc2fa23c80b769a9ad8`)
- The API expects JSON request bodies with `Content-Type: application/json` header for POST requests
- Error responses include an `error` field with a descriptive message

## Error Responses

- `400 Bad Request` - Invalid request format or missing required fields
- `404 Not Found` - Requested resource not found
- `500 Internal Server Error` - Server-side error occurred
