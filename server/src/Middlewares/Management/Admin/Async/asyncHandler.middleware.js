/* ======================================================
   asyncHandlerMiddleware
   ------------------------------------------------------
   ➤ Wraps ALL async controllers
   ➤ Removes try/catch duplication
   ➤ Any unhandled error → next(error)
   ➤ Works with every controller in ERP system
====================================================== */

export const asyncHandlerMiddleware = (controller) => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
