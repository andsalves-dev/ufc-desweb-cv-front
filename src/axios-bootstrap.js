import * as axios from "axios";
import {API_URL} from "./model/constant/api";
import {UserStorage} from "./model/util/localStorage";

axios.defaults.baseURL = API_URL;

axios.defaults.headers['post']['Content-Type'] = 'application/json';
axios.defaults.headers['get']['Content-Type'] = 'application/json';
axios.defaults.headers['patch']['Content-Type'] = 'application/json';
axios.defaults.headers['put']['Content-Type'] = 'application/json';
axios.defaults.headers['delete']['Content-Type'] = 'application/json';

const userData = UserStorage.getUserData();

if (userData && userData.jwt) {
    axios.defaults.headers['common']['X-Api-Token'] = userData.jwt;
}