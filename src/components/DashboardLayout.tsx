import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import useConfirmDialog from '../lib/hooks/useConfirmDialog';
import Sidebar from './Sidebar';
import ConfirmDialog from './utils/ConfirmDialog';
import { useProSidebar } from 'react-pro-sidebar';
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  if (pathname === '/login') return <>{children}</>;

  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const [shouldBackBtnShow, setShouldBackBtnShow] = useState<boolean>(false);
  const { showConfirmDialog } = useConfirmDialog();

  useEffect(() => {
    setShouldBackBtnShow(pathname.split('/').length > 3);
  }, [pathname]);

  return (
    <main style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div
        style={{
          height: '100vh',
          overflowY: 'scroll',
          width: '100%',
          position: 'relative',
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              size="large"
              edge="start"
              color="error"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => collapseSidebar()}
            >
              <MenuIcon />
            </IconButton>
            {shouldBackBtnShow && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <ConfirmDialog open={showConfirmDialog} />
        <Box style={{ padding: '1.5rem', height:"92%", backgroundColor:"#cad2c5" }} >{children}</Box>
      </div>
    </main>
  );
};

export default DashboardLayout;