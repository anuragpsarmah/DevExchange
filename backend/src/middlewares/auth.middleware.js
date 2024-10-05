import response from "../utils/response.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAuthorized = asyncHandler((req, res, next) => {
  let authKey = req.query.authKey;

  if (!authKey && req.headers.referer) {
    let refererUrl = new URL(req.headers.referer);
    authKey = refererUrl.searchParams.get("authKey");

    if (authKey) return res.redirect(`${req.originalUrl}?authKey=${authKey}`);
  }
  if (authKey == process.env.AUTH_KEY) return next();

  return response(res, 401, "Unauthorized access");
});

export { isAuthorized };
