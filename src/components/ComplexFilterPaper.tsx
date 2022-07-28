import { ChevronRight } from '@mui/icons-material';
import {
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
import { Search } from './Search';

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
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
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      id={id}
      className="popper"
      sx={{ zIndex: 99999, width: '40ch' }}
      {...popperProps}
    >
      <Box
        sx={{
          zIndex: 999999,
          position: 'relative',
          mt: '12px',
          '&::before': {
            backgroundColor: 'white',
            content: '""',
            display: 'block',
            position: 'absolute',
            width: 16,
            height: 16,
            top: -8,
            transform: 'rotate(225deg)',
            left: 'calc(50% - 8px)',
            boxShadow: '3px 3px 6px -3px rgba(0,0,0,0.2)',
          },
        }}
      />
      <Paper
        sx={{
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
                      onClick={(event) => handleSelected(item, filterParent)}
                    >
                      <Box>
                        <Typography variant="body1" color="primary.main" textAlign="left">
                          {item.text}
                        </Typography>
                        {item.secondary && (
                          <Typography variant="body2" color="action.active">
                            {item.secondary}
                          </Typography>
                        )}
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
                      <StyledRadio
                        sx={{ marginY: -4 }}
                        checked={item.selected || false}
                        onClick={() => handleSelected(item, filterParent)}
                        name={item.text}
                        value={item}
                        {...listItemProps}
                      />
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
