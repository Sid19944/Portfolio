import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { TimeLine } from "../model/timeLine.schema.js";

const addTimeLine = asyncHandler(async (req, res, next) => {
  const { name, from, to, about } = req.body;
  if (!name?.trim() || !from || !to || !about) {
    return next(ErrorHandler("Please Enter All Data", 400));
  }
  if (
    from < 1980 || from > new Date().getFullYear() ||
    to < 1980 || to > new Date().getFullYear()
  ) {
    return next(
      new ErrorHandler(`Invalid Year, 1980 to ${new Data().getFullYear()}`)
    );
  }
  const newTimeLine = await TimeLine.create({
    name: name?.trim(),
    from,
    to,
    about : about?.trim()
  });

  if (!newTimeLine) {
    return next(new ErrorHandler("Something Went Wrong", 400));
  }

  return res.status(200).json({
    message: "New Time Line Added.",
    success: true,
    newTimeLine: newTimeLine,
  });
});

const editTimeLine = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const newData = {
    name: req.body?.name?.trim(),
    from: req.body?.from,
    to: req.body?.to,
    about : req.body?.about
  };

  if (
    newData.from < 1980 || newData.from > new Date().getFullYear() ||
    newData.to < 1980 || newData.to > new Date().getFullYear()
  ) {
    return next(
      new ErrorHandler(`Invalid Year, 1980 to ${new Data().getFullYear()}`)
    );
  }

  const response = await TimeLine.findByIdAndUpdate(id, newData);
  if (!response) {
    return next(new ErrorHandler("Someting Went Wrong", 500));
  }
  return res.status(200).json({
    success: true,
    message: "Time Line updated Successfully",
  });
});

const deleteTimeLine = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await TimeLine.findByIdAndDelete(id);
  if (!response) {
    return next(new ErrorHandler("Someting Went Wrong", 500));
  }

  return res.status(200).json({
    success: true,
    message: "Time Line Deleted Successfully",
  });
});

const allTimeLine = asyncHandler(async (req, res, next) => {
  const allTimeLine = await TimeLine.find();
  if (!allTimeLine) {
    return next(new ErrorHandler("Something Went Wrong", 500));
  }
  return res.status(200).json({
    success: true,
    message: "All Time Line Fetched",
    allTimeLine: allTimeLine,
  });
});

const getOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const timeLine = await TimeLine.findById(id);
  if (!timeLine) {
    return next(new ErrorHandler("Invalid ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "time line found successfully",
    timeLine: timeLine,
  });
});

export { addTimeLine, editTimeLine, deleteTimeLine, allTimeLine, getOne };
