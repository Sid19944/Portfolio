import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../model/project.schema.js";
import { v2 as cloudinary } from "cloudinary";

const addProject = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Image is required", 400));
  }

  const { image } = req.files;
  if (!image) {
    return next(new ErrorHandler("Project iamge is required", 400));
  }
  const fileType = image?.mimetype?.split("/")
  const { title, description, technologies, stack } = req.body;
  if (
    !(title && description && technologies && stack) ||
    [title, description, stack].some((field) => field?.trim() === "")
  ) {
    return next(new ErrorHandler("Enter Enter All Data", 400));
  }

  const cloudinaryResForImage = await cloudinary.uploader.upload(
    image.tempFilePath,
    {
      resource_type: fileType[0],
      folder: "PROJECT'S IMAGES",
    }
  );
  if (!cloudinaryResForImage || cloudinaryResForImage.error) {
    console.log(
      "Cloudinary Error",
      cloudinaryResForImage.error || "Unknown Error from cloudinary"
    );
    return;
  }

  await Project.create({
    title,
    description,
    technologies,
    image: {
      public_id: cloudinaryResForImage.public_id,
      url: cloudinaryResForImage.secure_url,
    },
    stack,
    gitHubUrl: req.body?.gitHubUrl,
    projectUrl: req.boyd?.projectUrl,
  });

  return res.status(200).json({
    success: true,
    message: "Project Added Successfully",
    user: req.body,
  });
});

const allProject = asyncHandler(async (req, res, next) => {
  const projects = await Project.find().populate("technologies");

  const Aprojects = await Project.find();
  // console.log(Aprojects);

  if (!projects) {
    return next(
      new ErrorHandler("Something wrong while getting projects", 500)
    );
  }

  return res.status(200).json({
    success: true,
    message: "All project Fetched successfully",
    projects,
  });
});

const getSingleProject = asyncHandler(async (req, res, next) => {
  // console.log(req.params);
  const { id } = req.params;
  const project = await Project.findById(id).populate("technologies");
  if (!project) {
    return next(new ErrorHandler("Invalid project ID", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Project Fetch Successfully",
    project,
  });
});

const updateProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Invalid Project Id ", 400));
  }

  const newProjectData = {
    title: req.body.title?.trim(),
    description: req.body.description?.trim(),
    gitHubUrl: req.body.gitHubUrl?.trim(),
    projectUrl: req.body.projectUrl?.trim(),
    technologies: req.body.technologies,
    deployed: req.body.deployed?.trim(),
    stack: req.body.stack?.trim(),
  };

  if (req.files && req.files.image) {
    const { image } = req.files;

    const fileType = image?.mimetype?.split("/")
    const cloudinaryResForImage = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        resource_type: fileType[0],
        folder: "PROJECT'S IMAGES",
      }
    );

    if (!cloudinaryResForImage || cloudinaryResForImage.error) {
      return next(
        new ErrorHandler("Someting wrong while uploading image", 500)
      );
    }

    const public_id = cloudinaryResForImage.public_id;
    const url = cloudinaryResForImage.secure_url;
    if (!(public_id && url)) {
      return next(new ErrorHandler("Invalid response from Cloudinary", 500));
    }

    newProjectData.image = {
      public_id,
      url,
    };
    await cloudinary.uploader.destroy(project.image.public_id);
    console.log("old image deleted successfully");
  }

  await project.updateOne(newProjectData);

  return res.status(200).json({
    success: true,
    message: "Project Updated Successfully",
  });
});

const deletePtojectsTech = asyncHandler(async (req, res, next) => {
  const { id, techId } = req.params;

  const project = await Project.findById(id);

  if (!project) throw new ErrorHandler("Project not found", 400);

  const index = project.technologies.findIndex(
    (tech) => tech?.toString() === techId?.toString()
  );

  console.log(index);

  if (index === -1) {
    throw new Error("Technology not found");
  }

  await Project.updateOne(
    { _id: id },
    { $unset: { [`technologies.${index}`]: 1 } }
  );
  await Project.updateOne({ _id: id }, { $pull: { technologies: null } });

  return res
    .status(200)
    .json({ success: true, message: "Tech Deleted Successfully" });
});

const addNewTechAfterAddProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const tech = req.body;

  const pro = await Project.updateOne(
    { _id: id },
    {
      $push: {
        technologies: {
          $each: tech,
        },
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "New Tech Added", pro });
});

const deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return next(
      new ErrorHandler("Invalid Project ID or Project Doesn't Exists", 400)
    );
  }

  await cloudinary.uploader.destroy(project.image.public_id);
  console.log("imgae deleted successfully");

  return res
    .status(200)
    .json({ success: true, message: "Project deleted successfully" });
});

export {
  addProject,
  allProject,
  updateProject,
  deleteProject,
  deletePtojectsTech,
  addNewTechAfterAddProject,
  getSingleProject,
};
