import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { LetterAvatar } from './Avatar';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from 'routes';
import { AppDispatch, RootState } from 'store';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { useState } from 'react';
import { authSlice } from 'store/auth/reducer';

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { login } = useSelector((state: RootState) => state.auth);
  //const { setConfirmOpen } = authSlice.actions;
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const { logOut } = authSlice.actions;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <React.Fragment>
      <LetterAvatar onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 62,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {login}
        </MenuItem>
        <MenuItem>
          <Link to={routes.editProfile.path} style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Edit profile
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem
          //onClick={() => dispatch(setConfirmOpen(true))}
          onClick={() => setConfirmOpen(true)}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
      <ConfirmDialog
        confirmText="Ready to leave?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => dispatch(logOut())}
      ></ConfirmDialog>
    </React.Fragment>
  );
};
