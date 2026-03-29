import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";

import { registerUser } from "../../src/services/Signup.Service";
import * as repo from "../../src/repository/Signup.Repository";

describe("Signup Registration Data Validation", () => {
  afterEach(() => {
    sinon.restore();
  });

  const validUserRegistrationData = {
    firstName: "Divy",
    lastName: "Bhavsar",
    email: "divy@test.com",
    password: "Strong@Pass123",
    confirmPassword: "Strong@Pass123",
    registrationTime: new Date().toISOString(),
  };

  it("should Register user SuccesFully", async () => {
    sinon.stub(repo, "findbyUserEmail").resolves(false);
    sinon.stub(bcrypt, "hash").resolves("hashed_password");
    sinon.stub(repo, "createUser").resolves();

    const result = await registerUser(validUserRegistrationData);

    expect(result.success).to.be.true;
    expect(result.data).to.equal("USER_REGISTERED_SUCCESSFULLY");
  });

  it("should return return existing user if email already exist", async () => {
    sinon.stub(repo, "findbyUserEmail").resolves(true);

    const result = await registerUser(validUserRegistrationData);

    expect(result.success).to.be.false;
    expect(result.type).to.equal("EXISTING_USER");
  });

  it("should return internal error when DB insert fails", async () => {
    sinon.stub(repo, "findbyUserEmail").resolves();
    sinon.stub(bcrypt, "hash").resolves("hashed_password");
    sinon.stub(repo, "createUser").rejects(new Error("DB_ERROR"));

    const result = await registerUser(validUserRegistrationData);

    expect(result.success).to.be.false;
    expect(result.type).to.equal("INTERNAL_ERROR");
  });

  it("should return Intenal server error if findbyUserEmail throws unknown Error", async()=>{
    sinon.stub(repo, "findbyUserEmail").rejects(new Error("RANDOM_DB_ERROR"));

    const result = await registerUser(validUserRegistrationData);

    expect(result.success).to.be.false;
    expect(result.type).to.equal("INTERNAL_SERVER_ERROR");
  });


   it("should return INTERNAL_SERVER_ERROR if bcrypt fails", async () => {

    sinon.stub(repo, "findbyUserEmail").resolves(false);
    sinon.stub(bcrypt, "hash").rejects(new Error("HASH_FAIL"));

    const result = await registerUser(validUserRegistrationData);

    expect(result.success).to.be.false;
    expect(result.type).to.equal("INTERNAL_SERVER_ERROR");
  });

  it("should NOT call createUser if user already exists", async () => {

    sinon.stub(repo, "findbyUserEmail").resolves(true);
    const createStub = sinon.stub(repo, "createUser");

    await registerUser(validUserRegistrationData);

    expect(createStub.called).to.be.false;
  });


   it("should NOT call bcrypt.hash if validation fails", async () => {

    const hashStub = sinon.stub(bcrypt, "hash");

    const invalidUser = { ...validUserRegistrationData, email: "bad-email" };

    await registerUser(invalidUser as any);

    expect(hashStub.called).to.be.false;
  });

  it("should NOT call findbyUserEmail if validation fails", async () => {

    const findStub = sinon.stub(repo, "findbyUserEmail");

    const invalidUser = { ...validUserRegistrationData, email: "bad-email" };

    await registerUser(invalidUser as any);

    expect(findStub.called).to.be.false;
  });

  it("should store hashed password, not plain password", async () => {

    sinon.stub(repo, "findbyUserEmail").resolves();
    sinon.stub(bcrypt, "hash").resolves("hashed_password");

    const createStub = sinon.stub(repo, "createUser").resolves();

    await registerUser(validUserRegistrationData);

    const args = createStub.firstCall.args[0];

    expect(args.password).to.not.equal(validUserRegistrationData.password);
    expect(args.password).to.equal("hashed_password");
  });
});
