const questions = {
    "title": "Introduction",
    "logoPosition": "right",
    // "showProgressBar": "bottom",
    "showQuestionNumbers": true,
    "firstPageIsStarted": true,
    "completedHtml": "<div style=\"margin-bottom: 30px\"><div style=\"font-size: 50px; margin-bottom: 40px\">🚀🚀🚀</div><div style=\"margin-bottom: 15px\"><h3>Results</h3></div><div><h4>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers.</h4></div></div>",
    // "completedHtmlOnCondition": [
    //     {
    //         "expression": "{correctAnswers} == 0",
    //         "html": "<h4>Unfortunately, none of your answers is correct. Please try again.</h4>"
    //     },
    //     {
    //         "expression": "{correctAnswers} == {questionCount}",
    //         "html": "<h4>Congratulations! You answered all the questions correctly!</h4>"
    //     }
    // ],
    "pages": [
        {
            "name": "startPage",
            "elements": [
                {
                    "type": "html",
                    "name": "question9",
                    "html": "<p style=\"font-size:18px\">" +
                        "This assessment is designed to evaluate your understanding and knowledge of the key concepts covered in the course. Please read the instructions carefully before you begin and make sure to answer each question to the best of your ability. This test is divided into multiple sections, each focusing on different areas of the subject. Good luck!" +
                        "</p>"
                },
                {
                    "type": "boolean",
                    "name": "termsOfUse",
                    "titleLocation": "hidden",
                    "hideNumber": false,
                    "renderAs": "checkbox",
                    "label": "Start the test",
                    "isRequired": true,
                    "requiredErrorText": "Please check the 'Start' checkbox"
                }
            ]
        },
        {
            "name": "1",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "1",
                    "title": "What is the primary goal of Artificial Intelligence ?",
                    "choices": [
                        "To create machines that can think and learn like humans",
                        "To replace human workers with robots",
                        "To understand the human brain",
                        "To develop new types of software"],
                    "correctAnswer": "To create machines that can think and learn like humans"
                }
            ],
        },
        {
            "name": "2",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "2",
                    "title": "Which of the following is an example of a supervised learning algorithm ?",
                    "choices": [
                        "K-means clustering",
                        "Support Vector Machines (SVM)",
                        "Genetic Algorithms",
                        "Q-Learning"],
                    "correctAnswer": "Support Vector Machines (SVM)"
                }
            ],
        },
        {
            "name": "3",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "3",
                    "title": "In natural language processing (NLP), what does NLP stand for ?",
                    "choices": [
                        "Neural Language Processing",
                        "Natural Language Programming",
                        "Natural Language Processing",
                        "Neural Linguistic Programming"],
                    "correctAnswer": "Natural Language Processing"
                }
            ],
        },
        {
            "name": "4",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "4",
                    "title": "Which of these is a common application of AI in healthcare ?",
                    "choices": [
                        "Predicting patient outcomes using machine learning models",
                        "Automating payroll systems",
                        "Designing new medical uniforms",
                        "Marketing pharmaceutical products"],
                    "correctAnswer": "Predicting patient outcomes using machine learning models"
                }
            ],
        },
        {
            "name": "5",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "5",
                    "title": "What is the Turing Test used to determine ?",
                    "choices": [
                        "The speed of a computer processor",
                        "The intelligence of a machine",
                        "The accuracy of a machine's calculations",
                        "The efficiency of an algorithm"],
                    "correctAnswer": "The intelligence of a machine"
                }
            ],
        }
    ],
// "maxTimeToFinish": 200,
// "maxTimeToFinishPage": 20,
// "showTimerPanel": "top"
}

export function createQuestionAi(title) {
    let data = questions;
    data['title'] = title;
    return(data);
}