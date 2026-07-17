export const sendSuccess = (res, statusCode, data, message = "Success") => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const sendList = (res, statusCode, data, count, message = "Success") => {
  res.status(statusCode).json({
    status: "success",
    message,
    results: count,
    data,
  });
};
