import ReactPlayer from "react-player";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {IoIosSearch} from "react-icons/io";

const UploadYoutube = ({
                         loading, setLoading,
                         name, label, register, setValue, getValues,
                         errors, disabled = false
                       }) => {
  const {t} = useTranslation();
  const [previewSource, setPreviewSource] = useState(""); // current url
  const [tmpSourceUrl, setTmpSourceUrl] = useState(""); // temporary url

  useEffect(() => {
    let objType = typeof getValues(name);
    if (objType === 'string') {
      setPreviewSource(getValues(name));
      setTmpSourceUrl(getValues(name));
    }
    register(name, {required: true});
  }, [loading]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setTmpSourceUrl(value);
  };

  const handleUpdatePreview = (event) => {
    event.preventDefault();
    if (tmpSourceUrl === null) return;
    if (tmpSourceUrl === "") return;

    setPreviewSource(tmpSourceUrl);
    setValue(name, tmpSourceUrl);
  }
  return (
    <>
      <div className={"flex flex-col w-full gap-2"}>
        <label className="my-form-label" htmlFor="lectureUrl">{label}{!disabled &&
          <sup className="text-error">*</sup>}</label>
        <div className={"sm:h-[48px] h-[32px] pl-4 border sm:rounded-2xl rounded-xl flex gap-2"}>
          <input
            disabled={disabled}
            className="grow focus:outline-none"
            placeholder={"https://www.youtube.com/watch?v=xxxxxxx"}
            value={tmpSourceUrl}
            onChange={handleInputChange}
          />
          <button className={"btn btn-ghost sm:btn-md btn-sm rounded-l-none sm:rounded-r-2xl rounded-r-xl"} onClick={handleUpdatePreview}>
            <IoIosSearch className={"sm:text-lg text-sm"}/>
          </button>
        </div>
        {errors[name] && (<span className="my-form-style-error">{label} {t("isNeeded")}</span>)}
      </div>
      {previewSource &&
        <ReactPlayer
          url={previewSource}
          playing={false}
          controls={true}
          width={'100%'}
          height={'300px'}
        />
      }
    </>
  )
}
export default UploadYoutube