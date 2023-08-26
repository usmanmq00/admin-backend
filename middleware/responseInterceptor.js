const responseInterceptor = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    const response = {
      success: false,
      message: "",
      exception: "",
      data: {},
    };
    let varType;
    try {
      varType = JSON.parse(body);
      if (varType) {
        varType = "object";
      }
    } catch (err) {
      varType = "string";
    }
    if (varType === "string") {
      response.success = false;
      response.data = {};
      response.message = body;
    } else if (varType === "object") {
      response.success = true;
      response.data = JSON.parse(body);
    }
    res.send = originalSend;
    return res.send(response);
  };

  next();
};

module.exports = responseInterceptor;
