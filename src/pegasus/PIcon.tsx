import { Box, SxProps, Theme } from '@mui/system';
import React from 'react';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as AddIcon } from './icons/add.svg';
import { ReactComponent as ChevronLeft } from './icons/chevronLeft.svg';
import { ReactComponent as UpLoadIcon } from './icons/upload.svg';
import { ReactComponent as PDFFileIcon } from './icons/pdfFileIcon.svg';
import { ReactComponent as CloseIcon } from './icons/closeIcon.svg';
import { ReactComponent as IconCloseTag } from './icons/iconCloseTag.svg';
import { ReactComponent as PenIcon } from './icons/pen.svg';
import { ReactComponent as DownloadIcon } from './icons/download.svg';
import { ReactComponent as PhoneIcon } from './icons/phone.svg';
import { ReactComponent as GiftIcon } from './icons/gift.svg';
import { ReactComponent as HashTagIcon } from './icons/hashTag.svg';
import { ReactComponent as CalendarIcon } from './icons/calendar.svg';
import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
import { ReactComponent as StaffIcon } from './icons/staff.svg';
import { ReactComponent as CompanyIcon } from './icons/company.svg';
import { ReactComponent as TrainingIcon } from './icons/training.svg';
import { ReactComponent as LogoutIcon } from './icons/logout.svg';

export const customIconMap = {
  searchIcon: SearchIcon,
  addIcon: AddIcon,
  chevronLeft: ChevronLeft,
  upLoadIcon: UpLoadIcon,
  pdfFileIcon: PDFFileIcon,
  closeIcon: CloseIcon,
  iconCloseTag: IconCloseTag,
  penIcon: PenIcon,
  downloadIcon: DownloadIcon,
  phoneIcon: PhoneIcon,
  giftIcon: GiftIcon,
  hashTagIcon: HashTagIcon,
  calendarIcon: CalendarIcon,
  dashboardIcon: DashboardIcon,
  staffIcon: StaffIcon,
  companyIcon: CompanyIcon,
  trainingIcon: TrainingIcon,
  logoutIcon: LogoutIcon,
};
export const PIcon = ({
  name,
  sx,
  size,
  className,
}: {
  name: keyof typeof customIconMap;
  sx?: SxProps<Theme>;
  size?: number;
  className?: string;
}) => {
  // const MyComponent = customIconMap[name] as keyof JSX.IntrinsicElements;
  const MyComponent = customIconMap[name];
  return (
    <Box className={className ? className : ''} display="flex" sx={{ width: size, height: size, ...sx }}>
      <MyComponent />
    </Box>
  );
};
