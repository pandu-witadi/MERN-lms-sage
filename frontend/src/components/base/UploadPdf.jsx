import React, {useEffect, useRef, useState} from "react"
import {useDropzone} from "react-dropzone"
import {FiUploadCloud} from "react-icons/fi"
import {useTranslation} from "react-i18next";

import { pdfjs } from 'react-pdf';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const UploadPdf = ({
                       loading, setLoading,
                       name, label, register, setValue, getValues,
                       errors, fileExtension = [".pdf"], disabled=false
                   }) => {
    const {t} = useTranslation();
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const inputRef = useRef(null)
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        setSelectedFile(getValues(name) || null)
        let objType = typeof getValues(name);
        if (objType === 'object') {
            if (getValues(name) !== null) {
                previewFile(getValues(name));
            }
        } else if (objType === 'string') {
            setPreviewSource(getValues(name))
        }
        register(name, {required: true})
    }, [loading])


    useEffect(() => {
        setValue(name, selectedFile)
    }, [selectedFile, setValue])

    const onDrop = (acceptedFiles) => {
        // setLoading(true);
        const file = acceptedFiles[0]
        if (file) {
            previewFile(file)
            setSelectedFile(file)
        }
        // setLoading(false);
    }

    const handleFileChange = (event) => {
        // setLoading(true);
        const file = event.target.files[0];
        if (file) {
            previewFile(file)
            setSelectedFile(file)
        }
        // setLoading(false);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {"application/pdf": fileExtension},
        onDrop,
    })

    return (
        <div className={"flex flex-col w-full gap-2"}>
            <label className="my-form-label" htmlFor={name}>{label} <sup className="text-error">*</sup></label>
            <div className={`flex items-center justify-center w-full  border-2 border-dashed rounded-lg `}>
                {previewSource ? (
                    <div className="flex w-full h-full flex-col">
                        <div
                            style={{
                                height: '450px',
                                width: '100%',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            {/* The worker is necessary for rendering PDFs */}
                            <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
                                <Viewer
                                    fileUrl={previewSource}
                                    plugins={[defaultLayoutPluginInstance]}
                                    renderLoader={(percentages) => (
                                      <div className={"w-[240px]"}>
                                          <progress className={"progress progress-info w-56"} value={Math.round(percentages)} max={"100"}/>
                                      </div>
                                    )}
                                />
                            </Worker>

                        </div>

                        {(previewSource && disabled===false) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewSource("")
                                    setSelectedFile(null)
                                    setValue(name, null)
                                }}
                                className="my-3 underline text-error"
                            >
                                {t("btn.delete")}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={`flex items-center justify-center w-full rounded-lg bg-base-300 hover:bg-base-200 h-[128px]`}>
                        <label htmlFor="dropzone-file"
                               {...getRootProps()}
                               className="flex flex-col items-center justify-center w-full h-full cursor-pointer ">
                            <input
                                id="dropzone-file"
                                type="file"
                                {...getInputProps()}
                                ref={inputRef}
                                onChange={handleFileChange}
                                accept={fileExtension.join(",")}
                                className="hidden"
                            />
                            <FiUploadCloud className="text-4xl"/>
                            <div>
                                {t("areaUploadTitle")}
                            </div>
                            <div className={"text-sm text-neutral-700"}>
                                {t("btn.supports")}: {fileExtension.join(", ").replaceAll(".", "").toUpperCase()}
                            </div>
                        </label>
                    </div>
                )}
            </div>
            {errors[name] && (<span className="my-form-style-error">{label} {t("isNeeded")}</span>)}
        </div>
    )
}
export default UploadPdf