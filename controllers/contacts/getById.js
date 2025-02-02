const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findById(id);

    if (!result) {
      throw createError(404, `Product with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
