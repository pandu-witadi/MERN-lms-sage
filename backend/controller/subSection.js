//
//
const Section = require('../model/section')
const SubSection = require('../model/subSection')
// const { uploadImageToCloudinary } = require('../util/imageUploader')

const path = require('path')
const short = require('short-uuid')
const CF = require('../conf/conf_app')

const { getVideoDurationInSeconds } = require('get-video-duration')


// ================ create SubSection ================
exports.createSubSection = async (req, res) => {
    try {
        // extract data
        const { title, description, sectionId } = req.body;

        // validation
        if (!title || !description ||
            // !videoFile ||
            !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // upload video to cloudinary
        // const videoFileDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

        let obj_url = null

        // When a file has been uploaded
        if (req.files && Object.keys(req.files).length !== 0) {
            // extract video file
            const videoFile = req.files.video
            console.log('videoFile ', videoFile)
            if (videoFile) {

                // getVideoDurationInSeconds(videoFile.data).then((duration) => {
                //     console.log('duration : ' + duration)
                // })

                let video_filename = "vid-" + short.generate() + '-' + videoFile.name
                // Upload path
                const uploadPath = path.join(__dirname, "..", CF.path.video, video_filename)
                console.log(uploadPath)
                obj_url = video_filename
                videoFile.mv(uploadPath, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        obj_url = video_filename
                        console.log("... successfully uploaded ... " + obj_url)
                    }
                })
            }
        }

        // create entry in DB
        const SubSectionDetails = await SubSection.create({
            title,
            timeDuration: 200,
            description,
            videoUrl: obj_url
        })

        // link subsection id to section
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection")

        // return response
        res.status(200).json({
            success: true,
            data: updatedSection,
            message: 'SubSection created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating SubSection');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating SubSection'
        })
    }
}



// ================ Update SubSection ================
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;

        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'subSection ID is required to update'
            });
        }

        // find in DB
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        // add data
        if (title) {
            subSection.title = title;
        }

        if (description) {
            subSection.description = description;
        }

        // upload video to cloudinary
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            // const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            if (video) {
                let video_filename = "vid-" + short.generate() + '-' + video.name
                const uploadPath = path.join(__dirname, "..", CF.path.video, video_filename)
                video.mv(uploadPath, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("... successfully uploaded ... " + video_filename)
                    }
                })
                subSection.videoUrl = video_filename
            }
            // subSection.videoUrl = uploadDetails.secure_url;

            // subSection.timeDuration = uploadDetails.duration;
            subSection.timeDuration = 200
        }

        // save data to DB
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        });
    }
    catch (error) {
        console.error('Error while updating the section')
        console.error(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating the section",
        })
    }
}



// ================ Delete SubSection ================
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        // delete from DB
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate('subSection')

        // In frontned we have to take care - when subsection is deleted we are sending ,
        // only section data not full course details as we do in others

        // success response
        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,

            error: error.message,
            message: "An error occurred while deleting the SubSection",
        })
    }
}
