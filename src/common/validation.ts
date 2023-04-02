export const serialNumberPattern = "[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{8}";
export const serialNumberRegExp = new RegExp(serialNumberPattern);
export const ipv4Pattern = "^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})).){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$";
export const ipv4RegExp = new RegExp(ipv4Pattern);
