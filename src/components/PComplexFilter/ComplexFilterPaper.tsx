import { ChevronRight } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  Divider,
  FormControlLabel,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  Radio,
  styled,
  TextFieldProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { menuItemType } from './PComplexFilter';
import { Search } from '../Search';

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '24px',
  width: '24px',
  marginRight: theme.spacing(1),
}));

export type ComplexFilterPaperProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  id: string;
  popperProps?: PopperProps;
  paperProps?: PaperProps;
  titleProps?: TypographyProps;
  currentTitle?: string;
  back: boolean;
  backButton?: React.ReactNode;
  backButtonProps?: ButtonProps;
  searchable?: boolean;
  handleBack: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleSelected: (item: menuItemType, parent?: menuItemType) => void;
  filteredItems: menuItemType[];
  itemHeight: number;
  maxItems: number;
  listItemProps?: CheckboxProps;
  searchProps?: Omit<TextFieldProps, 'InputProps'>;
  itemsHistory?: menuItemType[][];
  filterParent?: menuItemType;
};

const ComplexFilterPaper = ({
  open,
  anchorEl,
  id,
  popperProps,
  paperProps,
  titleProps,
  currentTitle,
  back,
  backButton,
  backButtonProps,
  searchable,
  handleBack,
  handleSearchChange,
  handleSelected,
  filteredItems,
  itemHeight,
  maxItems,
  listItemProps,
  searchProps,
  itemsHistory,
  filterParent,
}: ComplexFilterPaperProps) => {
  const countSelected = (items: menuItemType[], count?: number) => {
    if (!count) {
      count = 0;
    }
    for (const child of items) {
      if (child.children) {
        const newCount: number = countSelected(child.children, count);
        if (newCount) {
          count = newCount;
        }
      } else if (child.selected) {
        count++;
      }
    }
    return count;
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      id={id}
      className="popper"
      sx={{ zIndex: 99999, width: '40ch' }}
      {...popperProps}
    >
      <Paper
        sx={{
          marginTop: '12px',
          borderRadius: 0,
          boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
          filter: 'drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.14)) drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.12))',
        }}
        {...paperProps}
      >
        <Box display="flex" flexDirection="row" alignItems="center" padding={2} flex={1}>
          <Typography variant="h6" flex={1} {...titleProps}>
            {currentTitle}
          </Typography>
          {back ? (
            <Button onClick={handleBack} {...backButtonProps}>
              {backButton}
            </Button>
          ) : null}
        </Box>
        {filteredItems.length > 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              maxHeight: itemHeight * maxItems,
              overflow: 'auto',
            }}
          >
            {/* {!filteredItems[0].children && searchable ? ( */}
            {searchable ? (
              <Box sx={{ paddingX: 2, paddingY: 0 }}>
                <Search fullWidth onChange={handleSearchChange} {...searchProps} />
              </Box>
            ) : null}
            {filteredItems &&
              filteredItems.map((item, index) =>
                item.children ? (
                  <React.Fragment key={index}>
                    <Button
                      key={item.text}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: itemHeight,
                        alignContent: 'center',
                        padding: 4,
                        borderRadius: 0,
                      }}
                      onClick={() => handleSelected(item, filterParent)}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        flex={1}
                        justifyContent="space-between"
                      >
                        <Box display="flex" flexDirection="column" flex={1}>
                          <Typography variant="body1" color="primary.main" textAlign="left">
                            {item.text}
                          </Typography>
                          {item.secondary && (
                            <Typography variant="body2" color="action.active" textAlign="left">
                              {item.secondary}
                            </Typography>
                          )}
                        </Box>
                        <StyledAvatar
                          sx={{
                            display: countSelected(item.children) === 0 ? 'none' : 'inline-flex',
                          }}
                        >
                          <Typography variant="body1" color="primary.contrastText">
                            {countSelected(item.children)}
                          </Typography>
                        </StyledAvatar>
                      </Box>
                      <ChevronRight color="action" />
                    </Button>
                    <Divider sx={{ width: '100%', margin: 0 }} />
                  </React.Fragment>
                ) : (
                  <FormControlLabel
                    key={item.text}
                    sx={{
                      margin: 1,
                      height: itemHeight,
                      alignContent: 'center',
                    }}
                    control={
                      (filterParent as menuItemType).multiple ? (
                        <StyledCheckbox
                          sx={{ marginY: -4 }}
                          checked={item.selected || false}
                          onClick={() => handleSelected(item, filterParent)}
                          name={item.text}
                          value={item}
                          {...listItemProps}
                        />
                      ) : (
                        <StyledRadio
                          sx={{ marginY: -4 }}
                          checked={item.selected || false}
                          onClick={() => handleSelected(item, filterParent)}
                          name={item.text}
                          value={item}
                          {...listItemProps}
                        />
                      )
                    }
                    label={
                      <React.Fragment>
                        <Typography variant="body1" color={item.selected ? 'primary.main' : 'text.primary'}>
                          {item.text}
                        </Typography>
                        {item.secondary && (
                          <Typography variant="body2" color="action.active">
                            {item.secondary}
                          </Typography>
                        )}
                      </React.Fragment>
                    }
                  />
                ),
              )}
          </Box>
        ) : null}
      </Paper>
    </Popper>
  );
};

export default ComplexFilterPaper;
