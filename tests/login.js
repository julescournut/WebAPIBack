import nock from "nock";
import express from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import mocha from 'mocha'
import mongoose from 'mongoose';
import { Mockgoose } from 'mock-mongoose';
import routes from "../routes/routes";

chai.use(chaiHttp);
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile });
console.log(process.env.JWT_SECRET)

const mockgoose = new Mockgoose(mongoose);
const api = express();
api.use(routes);

before((done) => {
  mockgoose.prepareStorage().then(function() {
    mongoose.connect(
        process.env.MONGO,
        { useNewUrlParser: true }
    );
    mongoose.set('useCreateIndex', true);

    let db = mongoose.connection;
    db.on("error", function() {
      done();
    });
    db.once("open", function() {
      done();
    });
  });
});

after(async () => {
  await mockgoose.helper.reset();
  await mongoose.disconnect();
  mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM');
});

describe("Login Tests", () => {

  describe("Login Bad", () => {
    it("Bad credentials", async () => {
      let response = await chai
        .request(api)
        .post(`/api/v1/login`)
        .send({ email: "admin", password: "wrong" });
      chai.expect(response).to.have.status(401);
    });
  });
});
