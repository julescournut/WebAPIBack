import jwt from "jsonwebtoken";
import _ from "lodash";
import crypto from 'crypto';

export async function verifyJWTToken(token) {
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new err();
    }
    return decodedToken;
  } catch (err) {
    throw new err();
  }
}

export function createJWToken(details) {
  if (typeof details !== "object") {
    details = {};
  }

  if (!details.maxAge || typeof details.maxAge !== "number") {
    details.maxAge = 3600;
  }

  details.sessionData = _.reduce(
    details.sessionData || {},
    (memo, val, key) => {
      if (typeof val !== "function" && key !== "password") {
        memo[key] = val;
      }
      return memo;
    },
    {}
  );

  let token = jwt.sign(
    {
      data: details.sessionData
    },
    process.env.JWT_SECRET,
    {
      expiresIn: details.maxAge,
      algorithm: "HS256"
    }
  );

  return token;
}

export function createSHA256_Hash(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64');
}

export function getJWTPayloadData(req) {
  let token = req.headers.authorization;
  let decoded = jwt.decode(token, {complete: true});
  let payload = decoded.payload.data;
  return payload;
}
