const { Parser } = require("json2csv");

exports.generateCSV = ({ doctors, patients, appointments }) => {
  try {
    const data = [
      {
        "Total Doctors": doctors,
        "Total patients": patients,
        "Total appointments": appointments,
      },
    ];

    const fields = ["Total Doctors", "Total patients", "Total appointments"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    return csv;
  } catch (error) {
    console.error("Error creating csv", err);
    throw new Error("Failed to gnerate CSV");
  }
};
