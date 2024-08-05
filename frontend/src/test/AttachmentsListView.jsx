import React from "react";

const AttachmentsListView = () => {
    return(
        <>
            <div className="mt-4 text-xl font-semibold">Attachments</div>
            <ol>
                <li>
                    <a className="text-blue-200 hover:text-blue-100 underline" target='_blank'
                       href={'https://github.com/manjunath5496/AI-Books/blob/master/aip(1).pdf'}>Attachments 1</a>
                </li>
                <li>
                    <a className="text-blue-200 hover:text-blue-100 underline" target='_blank'
                       href={'https://github.com/manjunath5496/AI-Books/blob/master/aip(2).pdf'}>Attachments 2</a>
                </li>
                <li>
                    <a className="text-blue-200 hover:text-blue-100 underline" target='_blank'
                       href={'https://github.com/manjunath5496/AI-Books/blob/master/aip(3).pdf'}>Attachments 3</a>
                </li>
                <li>
                    <a className="text-blue-200 hover:text-blue-100 underline" target='_blank'
                       href={'https://github.com/manjunath5496/AI-Books/blob/master/aip(4).pdf'}>Attachments 4</a>
                </li>
            </ol>
        </>
    )
}
export default AttachmentsListView