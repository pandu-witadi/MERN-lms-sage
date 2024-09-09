//
//
const Section = require('../model/section')
const SubSection = require('../model/subSection')
const path = require('path')
const short = require('short-uuid')
const CF = require('../conf/conf_app')
const {cleanFileName, moveFileToPath} = require("../util/utils");


// ================ create SubSection ================
exports.createSubSection = async (req, res) => {
    try {
        // extract data
        const { courseId, title, description, sectionId, lectureType, lectureContent } = req.body;

        // validation
        if (!title || !description ||
            // !videoFile ||
            !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // When a file has been uploaded
        let lecture_url = null;
        const directoryPath = path.join(__dirname, "..", CF.path.course, courseId);
        try {
            if (req.files && Object.keys(req.files).length !== 0) {
                const temp_file = req.files?.lectureUrl;
                if (temp_file) {
                    lecture_url = cleanFileName(temp_file.name);
                    moveFileToPath(path.join(directoryPath, lecture_url), temp_file);
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
                message: 'Error while saving attachment file'
            })
        }

        // create entry in DB
        const SubSectionDetails = await SubSection.create({
            title,
            timeDuration: "0",
            description,
            lectureType,
            lectureUrl: lecture_url,
            lectureContent
        })

        // link subsection id to section
        // Update the corresponding section with the newly created subsection
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
        const {courseId, sectionId, subSectionId, title, description, lectureType, lectureContent } = req.body;

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

        if (lectureType) {
            subSection.lectureType = lectureType;
        }

        if (lectureContent) {
            subSection.lectureContent = lectureContent;
        }

        // When a file has been uploaded
        let lecture_url = null;
        const directoryPath = path.join(__dirname, "..", CF.path.course, courseId);
        try {
            if (req.files && Object.keys(req.files).length !== 0) {
                const temp_file = req.files?.lectureUrl;
                if (temp_file) {
                    lecture_url = cleanFileName(temp_file.name);
                    moveFileToPath(path.join(directoryPath, lecture_url), temp_file);
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
                message: 'Error while saving attachment file'
            })
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
