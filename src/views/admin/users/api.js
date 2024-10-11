import Api from "./../../../config/api";

export const GetUsers = async (page) => {
    const res = await Api.get(`/users/all/${page}`);
    return res.data;
  
};
