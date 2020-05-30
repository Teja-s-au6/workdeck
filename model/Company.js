const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        name: {
            type: String
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "employee"
        },
        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: "employee"
            }
        ]
    }
)

const Company = mongoose.model("company", companySchema);

module.exports = Company;