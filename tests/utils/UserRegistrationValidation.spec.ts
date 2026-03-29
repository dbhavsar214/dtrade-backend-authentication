import { expect } from "chai";
import userRegistrationSchema from "../../src/utils/UserRegistrationValidation";

describe("UserRegistration Schema Validation", () => {

  const validUser = {
    firstName: "Divy",
    lastName: "Bhavsar",
    email: "divy@test.com",
    password: "Strong@Pass123",
    confirmPassword: "Strong@Pass123",
    registrationTime: new Date().toISOString(),
  };

  
  it("should pass for valid user data", () => {
    const result = userRegistrationSchema.parse(validUser);
    expect(result).to.deep.equal(validUser);
  });


  const invalidCases = [

    // firstName
    { name: "empty firstName", data: { ...validUser, firstName: "" } },
    { name: "firstName only spaces", data: { ...validUser, firstName: "   " } },
    { name: "firstName wrong type", data: { ...validUser, firstName: 123 } },

    // lastName
    { name: "empty lastName", data: { ...validUser, lastName: "" } },
    { name: "lastName only spaces", data: { ...validUser, lastName: "   " } },
    { name: "lastName null", data: { ...validUser, lastName: null } },

    // email
    { name: "invalid email format", data: { ...validUser, email: "invalid-email" } },
    { name: "email missing @", data: { ...validUser, email: "divytest.com" } },
    { name: "empty email", data: { ...validUser, email: "" } },

    // password
    { name: "short password", data: { ...validUser, password: "123", confirmPassword: "123" } },
    { name: "empty password", data: { ...validUser, password: "", confirmPassword: "" } },

    // confirmPassword
    { name: "password mismatch", data: { ...validUser, confirmPassword: "Wrong@123" } },
    { name: "empty confirmPassword", data: { ...validUser, confirmPassword: "" } },

    // registrationTime
    { name: "empty registrationTime", data: { ...validUser, registrationTime: "" } },
    { name: "invalid registrationTime", data: { ...validUser, registrationTime: "not-a-date" } },

    // whole object issues
    { name: "missing fields", data: { email: "test@test.com" } },
    { name: "completely empty object", data: {} },

  ];

  invalidCases.forEach(({ name, data }) => {
    it(`should fail for ${name}`, () => {
      expect(() => userRegistrationSchema.parse(data as any)).to.throw();
    });
  });

});