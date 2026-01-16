import mongoose, { Schema } from "mongoose";

const timeLineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    from: {
      type: Number,
      required: true,
      minimum: [1980,`minimun year 1980`],
      maximum: [new Date().getFullYear(),`maximum year ${new Date().getFullYear()}`]
    },
    to: {
      type: Number,
      required: true,
      minimum: [1980,`minimun year 1980`],
      maximum: [new Date().getFullYear(),`maximum year ${new Date().getFullYear()}`]
    },
  },
  { timestamps: true }
);

export const TimeLine = mongoose.model("TimeLine", timeLineSchema);
