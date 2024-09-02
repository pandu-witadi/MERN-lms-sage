import {useTranslation} from "react-i18next";
import Navbar from "../Layout/component/Navbar.jsx";
import {ToggleButton} from "../../../components/base/index.jsx";
import React, {useState} from "react";

export default function Notification({showHome}) {
  const {t} = useTranslation();
  const [selectedNotificationPage, setSelectedNotificationPage] = useState(t("notification.pageList", {returnObjects: true})[0]["key"]);

  return (
    <div className={"h-full"}>
      <Navbar showHome={showHome}/>
      <div className={"my-contents"}>
        <h1 className="my-page-title">
          {t("notification.title")}
        </h1>

        <div className={"flex flex-row gap-x-4"}>
          {
            t("notification.pageList", {returnObjects: true}).map(item => (
              <ToggleButton label={item.label} setToggle={setSelectedNotificationPage} key={item.key} id={item.key}
                            value={selectedNotificationPage}/>
            ))
          }
        </div>

        <div className={"flex flex-col items-center sm:text-5xl text-3xl p-8"}>
          <h1>Under Development</h1>
        </div>
      </div>
    </div>
  );
}