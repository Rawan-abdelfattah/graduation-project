import Api from "./../../../config/api";

export const GetRoles = async (page,search) => {
    const res = await Api.get(`/roles/${page}?query=${search}`);
    return res.data;
  
};

export const AddRole = async (data) => {
 
  const res = await Api.post('/roles', data);
  return res.data;
};
export const UpdateRole = async ({id,data}) => {
  const res = await Api.put(`/roles/${id}`, data);
  return res.data;
};

export const DeleteRole = async (id) => {
  const res = await Api.delete(`/roles/${id}`);
  return res.data;
};