import cron from "node-cron";
import axios from "axios";
import moment from "moment";

cron.schedule("* * * * *", async () => {
  const dateNow = moment().format("YYYY-MM-DD");
  const idDayWork_a = 1;
  const idDayWork_b = 2;

  try {
    const response_a = await axios.get(
      `http://localhost:5000/dayoffs/${idDayWork_a}/${dateNow}`
    );
    const response_b = await axios.get(
      `http://localhost:5000/workdays/${idDayWork_a}`
    );

    const count = response_b.data.count;
    if (!response_a.data.status) {
      const data = {
        count: count + 1,
      };
      axios
        .put(`http://localhost:5000/workdays/${idDayWork_a}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("PUT request successful");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (response_a.data.status) {
      console.log("Hari ini libur");
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const response_a = await axios.get(
      `http://localhost:5000/dayoffs/${idDayWork_b}/${dateNow}`
    );
    const response_b = await axios.get(
      `http://localhost:5000/workdays/${idDayWork_b}`
    );

    const count = response_b.data.count;
    if (!response_a.data.status) {
      const data = {
        count: count + 1,
      };
      axios
        .put(`http://localhost:5000/workdays/${idDayWork_b}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("PUT request successful");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (response_a.data.status) {
      console.log("Hari ini libur");
    }
  } catch (error) {
    console.error(error);
  }
});
