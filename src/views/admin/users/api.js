import Api from "./../../../config/api";

export const GetUsers = async (page,search) => {
    const res = await Api.get(`/users/all/${page}?query=${search}`);
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
export const UpdateUser = async ({id,data}) => {
  console.log('data', id,data);
  const res = await Api.patch(`/users/${id}`,data);
  return res.data;
};
export const ChangeUserPassword = async (data) => {
  const res = await Api.patch('/users/change-password');
  return res.data;
};
export const DeleteUser = async (id) => {
  const res = await Api.delete(`/users/${id}`);
  return res.data;
};