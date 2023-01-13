import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Link, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import Groups2Icon from '@mui/icons-material/Groups2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import Logo from '../../../Assets/Logo.png';
import { NavItem } from './nav-item.js';
import { getAdminByID } from '../../../Redux/slices/admin.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    href: '/admin/dashboard',
    icon: (<DashboardIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/admin/manage-employee',
    icon: (<Groups2Icon fontSize="small" />),
    title: 'Manage Employee'
  },
  {
    href: '/admin/manage-job',
    icon: (<WorkIcon fontSize="small" />),
    title: 'Manage Job'
  },
  {
    href: '/admin/manage-forms',
    icon: (<DescriptionIcon fontSize="small" />),
    title: 'Manage Form'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const detailId = JSON.parse(atob(token.split(".")[1])).detailId;

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins.currentAdmin);

  useEffect(() => {
    dispatch(getAdminByID(detailId));
  }, [dispatch, detailId]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Link href='/admin/dashboard' underline="none" color="inherit">
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'row' }}>
                <Box
                  component="img"
                  sx={{
                    height: 42,
                    width: 42
                  }}
                  alt="Your logo"
                  src={Logo}
                />
              <Box>
                <Typography
                    color="inherit"
                    variant="h4"
                  >
                  Power HR
                </Typography>
              </Box>
            </Box>
          </Link>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  {admin?.name}
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              to={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
            <Button
              color="error"
              component="a"
              endIcon={(<LogoutIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => {handleLogout()}}
            >
              Logout
            </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
