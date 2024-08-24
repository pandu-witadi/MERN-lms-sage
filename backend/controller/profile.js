//
//
const Profile = require('../model/profile')
const User = require('../model/user')
const CourseProgress = require('../model/courseProgress')
const Course = require('../model/course')

// const { uploadImageToCloudinary, deleteResourceFromCloudinary } = require('../util/imageUploader')
const { convertSecondsToDuration } = require('../util/secToDuration')

const path = require('path')
const short = require('short-uuid')

const CF = require('../conf/conf_app')


// ================ update Profile ================
exports.updateProfile = async (req, res) => {
    try {
        // extract data
        const { gender = '', dateOfBirth = "", about = "", contactNumber = '', firstName, lastName } = req.body;

        // extract userId
        const userId = req.user.id;


        // find profile
        const userDetails = await User.findById(userId)
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId)

        // console.log('User profileDetails -> ', profileDetails)

        // Update the profile fields
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save()

        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        // save data to DB
        await profileDetails.save()

        const updatedUserDetails = await User.findById(userId)
            .populate({
                path: 'additionalDetails'
            })
        // console.log('updatedUserDetails -> ', updatedUserDetails)

        // return response
        res.status(200).json({
            success: true,
            data: updatedUserDetails,
            message: 'Profile updated successfully'
        })
    }
    catch (error) {
        console.log('Error while updating profile')
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while updating profile'
        })
    }
}


// ================ delete Account ================
exports.deleteAccount = async (req, res) => {
    try {
        // extract user id
        const userId = req.user.id;
        // console.log('userId = ', userId)

        // validation
        const userDetails = await User.findById(userId)
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // delete user profile picture From Cloudinary
        // await deleteResourceFromCloudinary(userDetails.image)

        // if any student delete their account && enrollded in any course then ,
        // student entrolled in particular course sholud be decreae by one
        // user - courses - studentsEnrolled
        const userEnrolledCoursesId = userDetails.courses
        console.log('userEnrolledCourses ids = ', userEnrolledCoursesId)

        for (const courseId of userEnrolledCoursesId) {
            await Course.findByIdAndUpdate(courseId, {
                $pull: { studentsEnrolled: userId }
            })
        }

        // first - delete profie (profileDetails)
        await Profile.findByIdAndDelete(userDetails.additionalDetails)

        // second - delete account
        await User.findByIdAndDelete(userId)


        // sheduale this deleting account , crone job

        // return response
        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        })
    }
    catch (error) {
        console.log('Error while updating profile')
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while deleting profile'
        })
    }
}


// ================ get details of user ================
exports.getUserDetails = async (req, res) => {
    try {
        // extract userId
        const userId = req.user.id;
        console.log('id - ', userId)

        // get user details
        const userDetails = await User.findById(userId).populate('additionalDetails').exec()

        // return response
        res.status(200).json({
            success: true,
            data: userDetails,
            message: 'User data fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching user details')
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while fetching user details'
        })
    }
}



// ================ Update User profile Image ================
exports.updateUserProfileImage = async (req, res) => {
    try {
        const profileImage = req.files?.profileImage;
        const userId = req.user.id;

        // validation
        // console.log('profileImage = ', profileImage)

        // upload image to cloudinary
        // const image = await uploadImageToCloudinary(profileImage, process.env.FOLDER_NAME, 1000, 1000)
        // console.log('image url - ', image)
        let profileImage_url = null
        if (profileImage) {
            let profileImage_filename = "thumbnail-" + short.generate() + '-' + profileImage.name
            const uploadPath = path.join(__dirname, "..", CF.path.image, profileImage_filename)
            profileImage_url = profileImage_filename
            profileImage.mv(uploadPath, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("... successfully uploaded ... " + profileImage_filename)
                }
            })
        }


        // update in DB
        const updatedUserDetails = await User.findByIdAndUpdate(userId,
            // { image: image.secure_url },
            { image: CF.server.path_image + "/" + profileImage_url },
            { new: true }
        )
            .populate({
                path: 'additionalDetails'

            })

        // success response
        res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updatedUserDetails,
        })
    }
    catch (error) {
        console.log('Error while updating user profile image')
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while updating user profile image',
        })
    }
}




// ================ Get Enrolled Courses ================
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({ _id: userId, })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec()

        userDetails = userDetails.toObject()

        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            // add path
            userDetails.courses[i]['thumbnail'] = CF.server.path_image + '/' + userDetails.courses[i]['thumbnail']

            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })

            courseProgressCount = courseProgressCount?.completedVideos.length

            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}




// ================ instructor Dashboard ================
exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats
        })

        res.status(200).json(
            {
                courses: courseData,
                message: 'Instructor Dashboard Data fetched successfully'
            },

        )
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}
