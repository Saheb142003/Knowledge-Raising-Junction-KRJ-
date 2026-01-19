import ApiError from "../../Utility/Response/ErrorResponse.Utility.js";

/* ======================================================================================
   validateRequestMiddleware
   - Supports Joi / Zod / Yup validations
   - Validates: body, params, query (any or all)
   - Centralized error formatting
   ====================================================================================== */

export const validateRequestMiddleware = (schemas = {}) => {
  return (req, res, next) => {
    try {
      // schemas: { body, query, params }

      // BODY VALIDATION
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          return next(
            new ApiError(
              400,
              "Body validation failed",
              error.details.map((d) => ({
                field: d.path.join("."),
                message: d.message,
              }))
            )
          );
        }

        req.body = value; // sanitized body
      }

      // QUERY VALIDATION
      if (schemas.query) {
        const { error, value } = schemas.query.validate(req.query, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          return next(
            new ApiError(
              400,
              "Query validation failed",
              error.details.map((d) => ({
                field: d.path.join("."),
                message: d.message,
              }))
            )
          );
        }

        req.query = value; // sanitized query
      }

      // PARAMS VALIDATION
      if (schemas.params) {
        const { error, value } = schemas.params.validate(req.params, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          return next(
            new ApiError(
              400,
              "Params validation failed",
              error.details.map((d) => ({
                field: d.path.join("."),
                message: d.message,
              }))
            )
          );
        }

        req.params = value; // sanitized params
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
