export const loginSchema = {
  email: '',
  password: '',
};

export const addCompanySchema = {
  email: '',
  name: '',
  address: '',
  logo: '',
  noOfUsers: '',
  subscriptionPlanId: '',
  isActive: true,
};
export let addCompanyAdminSchema = {
  email: '',
  phone: '',
  username: '',
  companyId: '',
};

export const addManagerSchema = {
  employeeId: '',
  name: '',
  joiningDate: '',
  companyId: '',
  cnic: '',
  isActive: true,
};

export const addRoleSchema = {
  roleName: '',
  companyId: '',
};

export const addUserSchema = {
  email: '',
  employeeId: '',
  phone: '',
  username: '',
  roleId: '',
  companyId: '',
  isActive: true,
  isCompanyAdmin: false,
};
