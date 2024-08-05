import {Model} from 'survey-core';
import {Survey} from "survey-react-ui";
import 'survey-core/defaultV2.min.css';
import {BorderlessDark} from "survey-core/themes";
import {createQuestionAi} from "./data/questions-ai.js";

const CourseSectionPlayerTest = ({title}) => {
    const survey = new Model(createQuestionAi(title));
    survey.applyTheme(BorderlessDark);

    return (
        <>
            <Survey model={survey}/>
        </>
    )
}
export default CourseSectionPlayerTest