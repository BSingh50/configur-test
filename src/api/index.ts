import axios from 'axios';
import User from '../models/User';

export const getUsers = async () => await axios.get<User[]>("https://jsonplaceholder.typicode.com/users").then(res => res.data);
