import api from './api';

const authService = {
   
    register: async (userData) => {

        try{
               const response = await api.post('/auth/register', userData);

               if(response.data.user){
                localStorage.setItem('user',JSON.stringify(response.data.user))
               }
               return response.data;

        }catch(error){
            throw error;
        }       
    },






     login: async (credentials) => {

        try{
            const response= await api.post('/auth/login',credentials);

            if(response.data.user){
                localStorage.setItem('user',JSON.stringify(response.data.user));
            }
            return response.data;
        }catch(error){
            throw error;
        }  
    },


    logout:()=>{
        localStorage.removeItem('user');
    },

    getCurrentUser:()=>{
        const userStr=localStorage.getItem('user');
        return userStr? JSON.parse(userStr):null;
    },

    isAuthenticated:()=>{
        return localStorage.getItem('user')!==null;
    }
};

export default authService;