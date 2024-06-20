import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const GraphWidget = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [timeRange, setTimeRange] = useState([0, 6]); // Initial time range: January to July
  const openMenu = Boolean(anchorEl);
  const openDropdown = Boolean(dropdownAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDropdownAnchorEl(null);
  };

  const handleDropdownClick = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleSliderChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const boxStyle = {
    border: '1.5px solid #000',
    borderRadius: '10px',
    padding: '10px',
    width: '600px',
    height: '450px',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const titleStyle = {
    position: 'absolute',
    top: '2px',
    left: '12px',
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const hrStyle = {
    width: '100%',
    border: '1px solid #ddd',
    margin: '18px 0',
  };

  const settingsButtonStyle = {
    position: 'absolute',
    top: '-5px',
    right: '0px',
  };

  const filteredData = {
    labels: lineData.labels.slice(timeRange[0], timeRange[1] + 1),
    datasets: lineData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.slice(timeRange[0], timeRange[1] + 1),
    })),
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={boxStyle}>
        <h2 style={titleStyle}>Data Graph Chart</h2>
        <IconButton style={settingsButtonStyle} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>
            Widget Settings
            <IconButton
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-owns={openDropdown ? 'dropright-menu' : undefined}
              size="small"
              style={{ marginLeft: '3px', color: 'black' }}
            >
              <ArrowRightRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            Compare Graph
            <IconButton
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-owns={openDropdown ? 'dropright-menu' : undefined}
              size="small"
              style={{ marginLeft: '3px', color: 'black' }}
            >
              <ArrowRightRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>Generate Report</MenuItem>
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Menu>
        <hr style={hrStyle} />
        <Line data={filteredData} options={options} />
        <Box sx={{ mt: 2, ml: 2, mr: 2 }}>
          <Typography id="time-range-slider" gutterBottom>
            Time Range
          </Typography>
          <Slider
            value={timeRange}
            onChange={handleSliderChange}
            min={0}
            max={6}
            valueLabelDisplay="auto"
            aria-labelledby="time-range-slider"
            marks={[
              { value: 0, label: 'January' },
              { value: 1, label: 'February' },
              { value: 2, label: 'March' },
              { value: 3, label: 'April' },
              { value: 4, label: 'May' },
              { value: 5, label: 'June' },
              { value: 6, label: 'July' },
            ]}
          />
        </Box>
      </div>
    </div>
  );
};

export default GraphWidget;

