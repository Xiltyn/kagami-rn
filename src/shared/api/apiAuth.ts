import axios from 'axios';
import { API } from './api.config';
import getEnvVars from '../../utils/Environment';

const ENV = getEnvVars();

export const apiAuth = {
    signIn: (email: string, password: string) =>
        axios.post(`${ENV.API_URL}/${API.auth.login.endpoint}`, {
            email,
            password,
        }),

    signUpWithMailAndPassword: (email: string, password: string) =>
        axios.post(`${ENV.API_URL}/${API.auth.register}`, {
            email: email,
            password: password,
        }),
};
