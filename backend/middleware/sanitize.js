import mongoSanitize from "mongo-sanitize";
import xss from "xss";

export const sanitizeInputs = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        // 1️⃣ Remove MongoDB operators
        let sanitized = mongoSanitize(req.body[key].trim());
        // 2️⃣ Remove/escape XSS
        sanitized = xss(sanitized);
        req.body[key] = sanitized;
      }
    }
  }
  next();
};
