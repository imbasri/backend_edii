const sendResponse = {
   success: (res, status, result) => {
      const results = {
         status,
         meta: result.meta || null,
         msg: result.msg,
         data: result.data || null,
      };
      return res.status(status).json(results);
   },
   error: (res, status, error) => {
      return res
         .status(status)
         .json({ status, msg: error.msg, data: error.data || null });
   },
};
module.exports = sendResponse;
