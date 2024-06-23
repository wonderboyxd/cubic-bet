import { $api } from "@/shared/apiWrapper";

interface Data {
    login: string;
    password: string;
  }


  export const onLogin = (data: Data) => {
    return $api.get('/client-login', {
        login: data.login,
        password: data.password
    })
  };