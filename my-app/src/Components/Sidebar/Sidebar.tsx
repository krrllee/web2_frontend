import { Sidebar, Menu, MenuItem  } from 'react-pro-sidebar';

import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function GenerateSidebar(){
    return (
        <div className='sidebar'>
        <Sidebar>
        <Menu>
            <MenuItem>
                <Link to="/dashboard/verifyUsers">Verify users</Link>
            </MenuItem>
            <MenuItem>
            <Link to="/dashboard/orders">Orders</Link>
            </MenuItem>
        </Menu>
        </Sidebar>
        </div>
    );
}