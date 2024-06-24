import { $api } from "@/shared/apiWrapper";

interface Data {
    login: string;
    password: string;
}


  export const login = (data: Data) => {
    return $api.post('/client-login', {
        login: data.login,
        password: data.password
    })
  };

  export const userData = () => {
    return $api.get('/auth/me')
  }