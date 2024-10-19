import Api from "./../../../config/api";

export const GetUsers = async (page) => {
    const res = await Api.get(`/users/all/${page}`);
    return res.data;
  
};
export const GetRole = async () => {
  const res = await Api.get(`/roles/1`);
  return res.data;
};
export const AddUser = async (data) => {
 
  const res = await Api.post('/auth/register', data);
  return res.data;
};