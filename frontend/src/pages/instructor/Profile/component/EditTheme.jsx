import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {http_profile_update} from "../../../../services/operations/SettingsAPI.js"
import {toast} from "react-hot-toast";
import {ToggleButton} from "../../../../components/base/index.jsx";
import {setLoading} from "../../../../reducer/slices/authSlice.js";
import {useTranslation} from "react-i18next";

export default function EditTheme() {
    const {token, user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(user["language"]);
    const [selectedTheme, setSelectedTheme] = useState(user["theme"]);

    const submitFormData = () => {
        const data = {
            theme: selectedTheme,
            language: selectedLanguage
        }
        dispatch(setLoading(true));
        dispatch(http_profile_update(token, data)).then((response) => {
            response.status ? toast.success(t('settings.successUpdateTheme')) : toast.error(response.msg);
        })
        dispatch(setLoading(false));
    }

    return (
        <div className={"mt-4"}>
            <div className="my-card-border">
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[50%]">
                        <div className="my-card-title">{t("settings.editLanguage")}</div>
                        <div className={"flex flex-row gap-x-4"}>
                            {
                                t("settings.languageList", { returnObjects: true }).map(item => (
                                  <ToggleButton label={item.label} setToggle={setSelectedLanguage} key={item.key} id={item.key}
                                                value={selectedLanguage}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[50%]">
                        <div className="my-card-title">{t("settings.editTheme")}</div>
                        <div className={"flex flex-row gap-x-4"}>
                            {
                                t("settings.themeList", { returnObjects: true }).map(item => (
                                  <ToggleButton label={item.label} setToggle={setSelectedTheme} key={item.key} id={item.key}
                                                value={selectedTheme}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="divider"/>
                <div className="flex justify-end gap-5">
                    <button onClick={submitFormData} className={"my-btn-confirm"}>{t("btn.save")}</button>
                </div>
            </div>
        </div>
    )
}