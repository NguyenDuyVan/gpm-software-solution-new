// Type definitions
export type ProjectModule = {
  name: string;
  price: number;
  global_price: number;
  selected: boolean;
  disabled?: boolean;
};

export type ProjectPackage = {
  id: string | number;
  name: string;
  price: number;
  global_price: number;
};

export type Project = {
  id: string | number;
  name: string;
  modules: ProjectModule[];
  packages: ProjectPackage[];
};

export type OrderObject = {
  modify_license_mode: string;
  project_id: string | number | null;
  project_module_names: string[];
  project_package_id: string | number | null;
  actual_price: number;
  affiliate_code: string | null;
};

export type CustomerObject = {
  id: string | number | null;
  province: string | null;
  district: string | null;
  ward: string | null;
  addressText: string | null;
  display_name: string;
  phone_number: string;
  tax_code: string;
  address: string;
};

export type UIData = {
  projectModules: ProjectModule[];
  projectPackages: ProjectPackage[];
  projects: Project[];
};

export type PaymentMethod = {
  name: string;
  value: string;
};

export type AddressData = {
  [province: string]: {
    [district: string]: string[];
  };
};

export type CustomerUpdateObject = {
  id: string | number | null;
  display_name: string;
  phone_number: string;
  address: string;
  tax_code: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export type TransferData = {
  transfer_content: string;
};
