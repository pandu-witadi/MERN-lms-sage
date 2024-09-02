const {default: mongoose} = require('mongoose')
require('dotenv').config()

const User = require('../model/user');
const Course = require('../model/course');
const CourseProgress = require("../model/courseProgress")


const short = require('short-uuid')


// ================ capture the payment and Initiate the 'Rajorpay order' ================
exports.capturePayment = async (req, res) => {

  // extract courseId & userId
  const {coursesId} = req.body;
  // console.log('coursesId = ', typeof (coursesId))
  console.log('coursesId = ', coursesId)

  const userId = req.user.id


  if (coursesId.length === 0) {
    return res.json({success: false, message: "Please provide Course Id"});
  }

  let totalAmount = 0

  for (const course_id of coursesId) {
    let course
    try {
      // valid course Details
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(404).json({success: false, message: "Could not find the course"})
      }

      // check user already enrolled the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({success: false, message: "Student is already Enrolled"})
      }

      totalAmount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, message: error.message})
    }
  }

  // create order
  const currency = "INR"
  const options = {
    amount: totalAmount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  }

  // initiate payment using Rajorpay
  try {
    // const paymentResponse = await instance.instance.orders.create(options)
    const paymentResponse = {
      id: "order_" + short.generate(),
      entity: "order",
      currency: currency,
      amount_paid: options.amount,
      amount_due: 0,
      status: "created",
      created_at: new Date(Date.now())
    }
    // return response
    res.status(200).json({
      success: true,
      message: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Could not Initiate Order"});
  }

}


// ================ verify the payment ================
exports.verifyPayment = async (req, res) => {
  // const razorpay_order_id = req.body?.razorpay_order_id;
  // const razorpay_payment_id = req.body?.razorpay_payment_id;
  // const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.coursesId;
  const userId = req.user.id;
  // console.log(' req.body === ', req.body)

  if (
    // !razorpay_order_id || !razorpay_payment_id || !razorpay_signature ||
    !courses || !userId
  ) {
    return res.status(400).json({success: false, message: "Payment Failed, data not found"});
  }

  //enroll student
  await enrollStudents(courses, userId, res);
  //return res
  return res.status(200).json({success: true, message: "Payment Verified"});
}


// ================ enroll Students to course after payment ================
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({success: false, message: "Please Provide data for Courses or UserId"});
  }

  for (const courseId of courses) {
    try {
      //find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        {_id: courseId},
        {$push: {studentsEnrolled: userId}},
        {new: true},
      )

      if (!enrolledCourse) {
        return res.status(500).json({success: false, message: "Course not Found"});
      }
      // console.log("Updated course: ", enrolledCourse)

      // Initialize course progress with 0 percent
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })

      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        {new: true}
      )

      // console.log("Enrolled student: ", enrolledStudent)

      // Send an email notification to the enrolled student
      // const emailResponse = await mailSender(
      //   enrolledStudent.email,
      //   `Successfully Enrolled into ${enrolledCourse.courseName}`,
      //   courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
      // )
      //
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, message: error.message});
    }
  }
}