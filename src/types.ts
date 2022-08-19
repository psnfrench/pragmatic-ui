export type BaseFields = {
  _id: string;
  createdAt: number;
  updatedAt: number;
};

export type User = StaffInfo &
  BaseFields & {
    email?: string | null;
    active: boolean;
    password?: string; // for setting screen only
    type?: 'admin' | 'staff';
    avatarColor: string;
  };

export type StaffInfo = {
  gender: string;
  firstName: string;
  lastName: string;
  jobRole: string;
  startingDate: number;
  dateOfBirth: number;
  phoneNumber: string;
  email: string;
  certificateNumber?: string;
  certificateExpiryDate?: number;
  residentialAddress?: string;
  staffsReplace?: string[];
  reasonReplace?: string;
  documents?: FileInfo[];
  files?: File[];
};

export type FileInfo = {
  eTag: string;
  locationUrl: string;
  key: string;
  origFileName: string;
  timeUploaded: number;
};

export type Image = {
  bucket: string;
  date: number;
  filename: string;
  filesize: number;
  path: string;
  uid: string;
  signedUrl?: string;
  base64?: unknown; // for blob previews
};