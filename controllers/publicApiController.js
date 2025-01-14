const axios = require("axios");

const getWorldTime = async (req, res) => {
  const { timezone } = req.params;

  try {
    const response = await axios.get(
      `http://worldtimeapi.org/api/timezone/${timezone}`
    );
    res.status(200).json({
      timezone: response.data.timezone,
      current_time: response.data.datetime,
      utc_offset: response.data.utc_offset
    });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Failed to fetch time. Please check the timezone or try again later."
      });
  }
};

module.exports = { getWorldTime };
