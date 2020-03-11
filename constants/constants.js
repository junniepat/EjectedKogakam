import React from 'react';
import axios from 'axios'
import {AsyncStorage} from 'react-native'

axios.defaults.headers.common['sesson_token'] = AsyncStorage.getItem('token');
axios.defaults.headers.common['app_key'] = 'TrQZYFHYM8+pezuWbY3GT+N3vpKxXHVsVT85WqbC4ag=';
axios.defaults.baseURL = 'https://kogakam.com/api/v1/';
//API URL
export const API_URL = 'https://kogakam.com/api/v1';

//API End Points
export const REGISTER = `${API_URL}/register`;
export const LOGIN = `${API_URL}/login`;
export const PROFILE = `${API_URL}/userProfile`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`; 