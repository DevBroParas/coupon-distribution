# Coupon App

This project is a simple coupon distribution application built with React. Users can claim coupons and are subjected to a cooldown period before they can claim another coupon.

## Features

- Claim a coupon with a single click.
- Display a cooldown timer to prevent multiple claims within a short period.
- Show toast notifications for successful coupon claims.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DevBroParas/coupon-distribution.git
   ```
2. Navigate to the project directory:
   ```sh
   cd coupen-app
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Components

### `Page`

This is the main component of the application. It handles the state and logic for claiming coupons and displaying the cooldown timer.

#### State Variables

- `message`: Stores the message returned from the server after claiming a coupon.
- `coupon`: Stores the coupon code returned from the server.
- `cooldownEndTime`: Stores the end time of the cooldown period.

#### Functions

- `claimCoupon`: Fetches a coupon from the server and updates the state.
- `getRemainingTime`: Calculates the remaining cooldown time.
- `formatTime`: Formats the cooldown time in minutes and seconds.

## API

The application interacts with API endpoints to claim and seed coupons.

- `GET /api/claim`: Returns a JSON object with the following structure:

  ```json
  {
    "message": "Coupon claimed successfully!",
    "code": "COUPON123",
    "cooldownEndTime": 1633036800000
  }
  ```

- `POST /api/seed`: Seeds the database with initial coupon data. Returns a JSON object with the following structure:
  ```json
  {
    "message": "Database seeded successfully!"
  }
  ```

## Dependencies

- `react`: JavaScript library for building user interfaces.
- `react-toastify`: Library for displaying toast notifications.

## Abuse Prevention Strategies

To prevent abuse and ensure fair distribution of coupons, the following strategies have been implemented:

- **Cooldown Period**: After claiming a coupon, users must wait for a specified cooldown period before they can claim another coupon. This is managed by storing the `cooldownEndTime` in the local storage and checking it before allowing another claim.
- **Local Storage**: The cooldown end time is stored in the user's local storage to persist the cooldown state even if the page is refreshed or the browser is closed and reopened.
