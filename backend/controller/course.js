const Course = require('../model/course')
const User = require('../model/user')
const Category = require('../model/category')
const Section = require('../model/section')
const SubSection = require('../model/subSection')
const CourseProgress = require('../model/courseProgress')
const {convertSecondsToDuration} = require("../util/secToDuration")


const path = require('path')
const short = require('short-uuid')

const CF = require('../conf/conf_app')
const {createRandomId, checkDirectoryExists, createDirectory, cleanFileName, moveFileToPath, deleteDirectory, isSubsectionHasAttachment} = require("../util/utils");

function getCourseThumbnail(course) {
  return (CF.server.path_course + '/' + course['courseId'] + '/' + course['thumbnail'])
}

// ================ create new course ================
exports.createCourse = async (req, res) => {
  try {
    // extract data
    let {courseName, courseDescription, whatYouWillLearn, category, instructions: _instructions, status, tag: _tag} = req.body
    let price = 0;

    // Convert the tag and instructions from stringifies Array to Array
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    // validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !category || !tag.length) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are required'
      })
    }

    if (!status)
      status = "Draft"

    // check current user is instructor or not , because only instructor can create
    // we have insert user id in req.user , (payload , while auth )
    const instructorId = req.user.id

    // check given category is valid or not
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: 'Category Details not found'
      })
    }

    // try to add the new course with unique courseId. Create the directory if not exists to save the course data files
    let thumbnail_url = null;
    let isDirectoryExists = true;
    let courseId = "";
    let idxTry = 0;
    while (isDirectoryExists) {
      courseId = createRandomId({totalChar: 2, totalNumber: 4});
      // check of course id is unique or not
      try {
        const directoryPath = path.join(__dirname, "..", CF.path.course, courseId);
        isDirectoryExists = await checkDirectoryExists(directoryPath);
        if (!isDirectoryExists) {
          createDirectory(directoryPath);
          if (req.files && Object.keys(req.files).length !== 0) {
            const temp_file = req.files?.thumbnailImage;
            if (temp_file) {
              thumbnail_url = cleanFileName(temp_file.name);
              moveFileToPath(path.join(directoryPath, thumbnail_url), temp_file);
            }
          }
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
          message: 'Error while creating random course ID'
        })
      }

      idxTry += 1;

      if (idxTry === 10) {
        return res.status(500).json({
          success: false,
          error: "Error",
          message: 'Maximum unique course ID loop reached'
        })
      }
    }

    let newCourse = null;
    try {
      // create new course - entry in DB
        newCourse = await Course.create({
        courseId,
        courseName,
        courseDescription,
        instructor: instructorId,
        whatYouWillLearn,
        price,
        category: categoryDetails._id,
        tag,
        status,
        instructions,
        thumbnail: thumbnail_url,
        createdAt: Date.now(),
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Error while creating new course'
      })
    }

    // // add course id to instructor courses list, this is because - it will show all created courses by instructor
    // await User.findByIdAndUpdate(instructorId,
    //   {
    //     $push: {
    //       courses: newCourse._id
    //     }
    //   },
    //   {new: true}
    // )

    // // Add the new course to the Categories
    // await Category.findByIdAndUpdate(
    //   {_id: category},
    //   {
    //     $push: {
    //       courses: newCourse._id,
    //     },
    //   },
    //   {new: true}
    // )

    // return response
    res.status(200).json({
      success: true,
      data: newCourse,
      message: 'New Course created successfully'
    })
  } catch (error) {
    console.log('Error while creating new course')
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error while creating new course'
    })
  }
}


// ================ show all courses ================
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({},
      {
        courseName: true,
        courseDescription: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true
      })
      .populate({
        path: 'instructor',
        select: 'firstName lastName email image'
      })
      .exec()

    return res.status(200).json({
      success: true,
      data: allCourses,
      message: 'Data for all courses fetched successfully'
    })
  } catch (error) {
    console.log('Error while fetching data of all courses')
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error while fetching data of all courses'
    })
  }
}


// ================ Get Course Details ================
exports.getCourseDetails = async (req, res) => {
  try {
    // get course ID
    const {courseId} = req.body;

    // find course details
    const courseDetails = await Course.findOne({_id: courseId})
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")

      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()


    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   })
    // }

    // console.log('courseDetails -> ', courseDetails)
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)


    courseDetails['thumbnail'] = getCourseThumbnail(courseDetails);

    //return response
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
      message: 'Fetched course data successfully'
    })
  } catch (error) {
    console.log('Error while fetching course details')
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error while fetching course details',
    })
  }
}


// ================ Get Full Course Details ================
exports.getFullCourseDetails = async (req, res) => {
  try {
    const {courseId} = req.body
    const userId = req.user.id
    // console.log('courseId userId  = ', courseId, " == ", userId)

    const courseDetails = await Course.findOne({_id: courseId})
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (courseDetails) {
      courseDetails['thumbnail'] = getCourseThumbnail(courseDetails);
      for (let i = 0; i < courseDetails['courseContent'].length; i++) {
        for (let j = 0; j < courseDetails['courseContent'][i]['subSection'].length; j++) {
          let item_ = courseDetails['courseContent'][i]['subSection'][j];
          if(isSubsectionHasAttachment(item_.lectureType)) {
            item_['lectureUrl'] = CF.server.path_course + '/' + courseDetails['courseId'] + '/' + item_['lectureUrl'];
          }
        }
      }
    }

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // //   count total time duration of course
    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })
    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    const totalDuration = "0";

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// ================ Edit Course Details ================
exports.editCourse = async (req, res) => {
  try {
    const {currentCourseId} = req.body
    const updates = req.body
    const course = await Course.findById(currentCourseId)

    if (!course) {
      return res.status(404).json({error: "Course not found"})
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      let thumbnail_url = "";
      const directoryPath = path.join(__dirname, "..", CF.path.course, course["courseId"]);
      const temp_file = req.files?.thumbnailImage;
      if (temp_file) {
        thumbnail_url = cleanFileName(temp_file.name);
        moveFileToPath(path.join(directoryPath, thumbnail_url), temp_file);
      }
      course.thumbnail = thumbnail_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    // updatedAt
    course.updatedAt = Date.now()

    //   save data
    await course.save()

    const updatedCourse = await Course.findOne({_id: currentCourseId})
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    // success response
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error while updating course",
      error: error.message,
    })
  }
}


// ================ Get a list of Course for a given Instructor ================
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({instructor: instructorId,}).sort({createdAt: -1})
    if (instructorCourses && instructorCourses.length > 0) {
      for (let i = 0; i < instructorCourses.length; i++) {
        instructorCourses[i]['thumbnail'] = getCourseThumbnail(instructorCourses[i]);
      }
    }

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
      // totalDurationInSeconds:totalDurationInSeconds,
      message: 'Courses made by Instructor fetched successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}


// ================ Delete the Course ================
exports.deleteCourse = async (req, res) => {
  try {
    const {courseId} = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({message: "Course not found"})
    }

    // Unroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: {courses: courseId},
      })
    }

    // delete course data path
    // testCourse is just a temporary name to delete the course when the courseId is null
    const directoryPath = path.join(__dirname, "..", CF.path.course, course.courseId ?? "testCourse");
    if(checkDirectoryExists(directoryPath)) {
      await deleteDirectory(directoryPath);
    }

    // Delete sections and subsections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete subsections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          const subSection = await SubSection.findById(subSectionId)
          if (subSection) {
            // await deleteResourceFromCloudinary(subSection.videoUrl) // delete course videos From Cloudinary
          }
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // // Delete course ID from categories
    // const category = await Category.findById(course["category"]);
    // category["courses"].remove(courseId)
    // await category.save();

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Error while Deleting course",
      error: error.message,
    })
  }
}
