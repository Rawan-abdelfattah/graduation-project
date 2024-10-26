import Api from "../../../config/api";

export const GetSpecialization = async (page, search) => {
  const res = await Api.get(`/spatialization/all/${page}?query=${search}`);
  return res.data;
};

export const AddSpecialization = async (data) => {
  const res = await Api.post('/spatialization', data);
  return res.data;
};
export const UpdateSpecialization = async ({ id, data }) => {
  const res = await Api.patch(`/spatialization/${id}`, data);
  return res.data;
};

export const DeleteSpecialization = async (id) => {
  const res = await Api.delete(`/spatialization/${id}`);
  return res.data;
};