
import React, {useEffect, useRef, useState} from "react"
import {useDropzone} from "react-dropzone"
import {FiUploadCloud} from "react-icons/fi"
import {useTranslation} from "react-i18next";

export default function UploadFile({
                                      name, label, register, setValue, getValues,
                                      errors, fileExtension = [".pdf"], height
                                    }) {
  const {t} = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const inputRef = useRef(null)

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
    if(objType === 'object'){
      if(getValues(name) !== null){
        previewFile(getValues(name));
      }
    }
    else if(objType === 'string'){
      setPreviewSource(getValues(name))
    }
    register(name, {required: true})
  }, [])


  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {"pdf/*": fileExtension},
    onDrop,
  })

  return (
    <div className={"flex flex-col w-full gap-2"}>
      <label className="my-form-label" htmlFor={name}>{label} <sup className="text-error">*</sup></label>

      <div className={`flex items-center justify-center w-full  border-2 border-dashed rounded-lg ${height ? height : "h-64"}`}>
        {previewSource ? (
          <div className="flex w-full h-full flex-col pt-2 pb-2">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full object-contain"
            />

            {previewSource && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 underline"
              >
                {t("btn.delete")}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-lg bg-base-300 hover:bg-base-200">
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