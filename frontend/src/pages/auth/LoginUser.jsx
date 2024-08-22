import TemplateLogin from "./component/TemplateLogin.jsx"
import {appLocale} from "../../locale/index.js";

function LoginUser() {
  return (
    <TemplateLogin
      title={appLocale['login']['titleUser']}
    />
  )
}

export default LoginUser