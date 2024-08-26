import TemplateLogin from "./component/TemplateLogin.jsx"
import {useTranslation} from "react-i18next";

function LoginUser() {
  const { t } = useTranslation();

  return (
    <TemplateLogin
      title={t('login.titleUser')}
    />
  )
}

export default LoginUser