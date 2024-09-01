enum UserRoles {
  ADMIN,
  FINANCE_OFFICER,
  HOD,
}

type CustomButtonParams = {
  onPress: () => void;
  buttonText: string;
};

type CustomTextInputParams = {
  placeholder: string;
  value: string;
  backgroundWhite?: boolean;
  hidden?: boolean;
  onChangeText: (text: string) => void;
};

interface LoginParams {
  email: string;
  password: string;
}
interface RegisterParams {
  fullName: string;
  email: string;
  phoneNo: string;
  role: string;
  organization?: string;
  address: string;
  password: string;
}

type Invoice = {
  id: string;
  fromName: string;
  createdBy: string;
  invoiceType: string;
  invoiceName: string;
  fromAddress: string;
  toName: string;
  toAddress: string;
  date: string;
  items: [];
  totalAmount: string;
};

type InvoiceItem = {
  description: string;
  hours?: string;
  price: string;
};

type User = {
  id: string;
  fullName: string;
  organization: string;
  email: string;
  phoneNo: string;
  address: string;
  role: string;
};
