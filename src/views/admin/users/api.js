import Api from "./../../../config/api";
import { faCheckSquare, faSquare, faLock, faLockOpen, faMinusSquare, faPlusSquare, faFile, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const GetUsers = async (page, search) => {
  const res = await Api.get(`/users/all/${page}?query=${search}`);
  return res.data;
};

export const GetPermission = async (id) => {
  const res = await Api.get(`/permissions/all-user-permission/${id}`);
  return res.data;
};
export const GetScreens = async (id) => {
  const res = await Api.get(`/permissions/screens-display`);
  return res.data;
};
export const GetRole = async () => {
  const res = await Api.get(`/roles/1`);
  return res.data;
};

export const GetSpectialization  = async () => {
  const res = await Api.get(`/spatialization/all/1`);
  return res.data?.data;
};

export const AddUser = async (data) => {

  const res = await Api.post('/auth/register', data);
  return res.data;
};
export const SavePermission = async (data) => {
  const res = await Api.patch(`/permissions/${data.id}`, data);
  return res.data;
};
export const UpdateUser = async ({ id, data }) => {
  console.log('data', id, data);
  const res = await Api.patch(`/users/${id}`, data);
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
export const icons = {
  check: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-check"
      icon={faCheckSquare}
    />
  ),
  uncheck: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-uncheck"
      icon={faSquare}
    />
  ),
  expandClose: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-expand-close"
      icon={faPlusSquare}
    />
  ),
  expandOpen: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-expand-open"
      icon={faMinusSquare}
    />
  ),
  collapseAll: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-collapse-all"
      icon={faPlusSquare}
    />
  ),
  parentClose: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-parent-close"
      icon={faLock}
    />
  ),
  parentOpen: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-parent-open"
      icon={faLockOpen}
    />
  ),
  leaf: (
    <FontAwesomeIcon
      style={{ fontSize: '3rem', color: '#3B8F4F' }}
      className="rct-icon rct-icon-leaf"
      icon={faFile}
    />
  ),
};