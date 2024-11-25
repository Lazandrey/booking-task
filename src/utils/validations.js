import tenantModel from "../model/tenant.js";
import clientModel from "../model/client.js";

const isTenantEmailExists = async (email) => {
  const response = await tenantModel.findOne({ email: email });
  return response === null ? false : true;
};

const isClientEmailExists = async (email) => {
  const response = await clientModel.findOne({ email: email });
  return response === null ? false : true;
};

const isValidCreateTenant = async (tenant) => {
  const resposnse = [];
  if (!tenant.name) {
    resposnse.push("Name is required");
  }
  if (!tenant.email) {
    resposnse.push("Email is required");
  }
  if (!tenant.password) {
    resposnse.push("Password is required");
  }

  if (await isTenantEmailExists(tenant.email)) {
    resposnse.push("Email already exists");
  }

  return resposnse;
};
const isValidCreateClient = async (client) => {
  const resposnse = [];
  if (!client.name) {
    resposnse.push("Name is required");
  }
  if (!client.email) {
    resposnse.push("Email is required");
  }
  if (!client.password) {
    resposnse.push("Password is required");
  }

  if (await isClientEmailExists(client.email)) {
    resposnse.push("Email already exists");
  }

  return resposnse;
};

const isValidCreateAccommodation = async (accommodation) => {
  const response = [];

  if (!accommodation.name) {
    response.push("Name is required");
  }
  if (!accommodation.type) {
    response.push("Type is required");
  }
  if (!accommodation.description) {
    response.push("Description is required");
  }

  if (!accommodation.area) {
    response.push("Area is required");
  }
  if (!accommodation.roomsNo) {
    response.push("Rooms No is required");
  }
  if (!accommodation.floorNo) {
    response.push("Floor No is required");
  }
  return response;
};

const isValidCreateOffer = (offer) => {
  const response = [];

  if (!offer.startDate) {
    response.push("Start Date is required");
  }
  if (!offer.endDate) {
    response.push("End Date is required");
  }
  if (!offer.price) {
    response.push("Price is required");
  }
  return response;
};

export {
  isValidCreateTenant,
  isTenantEmailExists,
  isValidCreateAccommodation,
  isValidCreateOffer,
  isValidCreateClient,
};
