# booking-task

This is booking backend service.

Endpoints:

## Tenants

POST /tenant/signin

    create tenant account with parameters:
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

POST /tenant/login

    login tenant account with parameters:
    email: { type: String, required: true },
    password: { type: String, required: true },

## Accommodations

    POST /tenant/accommodations

    Authorized tenant can create accommodation with parameters:
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    address: {
     apartmentNo: { type: String, required: false },
     houseNo: { type: String, required: true },
     street: { type: String, required: true },
     city: { type: String, required: true },
     country: { type: String, required: true },
    },
    area: { type: Number, required: true },
    roomsNo: { type: Number, required: true },
    floorNo: { type: Number, required: true },

    GET /tenant/accommodations

    Authorized tenant can get all own accommodations

    GET /tenant/accommodations/:id

    Authorized tenant can get own accommodation by id

    PUT /tenant/accommodations/:id

    Authorized tenant can update accommodation by id with parameters:
      name: { type: String },
      type: { type: String },
      description: { type: String },
       address: {
        apartmentNo: { type: String },
        houseNo: { type: String },
        street: { type: String },
        city: { type: String },
        country: { type: String },
      },
     area: { type: Number },
     roomsNo: { type: Number },
     floorNo: { type: Number },

    DELETE /tenant/accommodations/:id

    Authorized tenant can delete accommodation by id

## Offers

POST /tenant/offers

    Authorized tenant can create offer with parameters:
      accommodation: accommodation._id

startDate: { type: Date, required: true },
endDate: { type: Date, required: true },
price: { type: Number, required: true },

GET /tenant/offers

    Authorized tenant can get all own offers

GET /tenant/offers/:id

    Authorized tenant can get own offer by id

PUT /tenant/offers/:id

    Authorized tenant can update offer by id with parameters:
    startDate: { type: Date },
    endDate: { type: Date },
    price: { type: Number },

DELETE /tenant/offers/:id

    Authorized tenant can delete offer by id

## Client

    POST /client/signin

    create client account with parameters:
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    POST /client/login

    login client account with parameters:
    email: { type: String, required: true },
    password: { type: String, required: true },

## Bookings

    POST /client/bookings

    Authorized client can create booking with parameters:
     offer: offer._id
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    GET /client/bookings

    Authorized client can get all own bookings

    GET /client/bookings/:id

    Authorized client can get own booking by id

    PUT /client/bookings/:id

    Authorized client can update booking by id with parameters:
    startDate: { type: Date },
    endDate: { type: Date  },

    DELETE /client/bookings/:id

    Authorized client can delete booking by id

## OfferList

    GET /offerlists
     Without authorization can get all available offer lists with price and
     available bookings dates including alredy booked dates
