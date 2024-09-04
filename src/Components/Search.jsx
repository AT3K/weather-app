import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value);
        console.log('Searching for:', value);
    };

    const handleInputChange = () => {
        console.log('Input clicked');
    };

    return (
        <div>
            <Box sx={{ flexGrow: { xs: 0, lg: 1 } }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        border: '1px solid gray',
                        width: { xs: 280, sm: 500, md: 500, lg: 600 },
                        height: { xs: 40, md: 'auto' },
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        ml: 0,
                        bgcolor:'white'
                    }}
                >
                    <IconButton color="black">
                        <SearchIcon />
                    </IconButton>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onInput={(e) => handleSearch(e.target.value)}
                        onClick={handleInputChange}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default Search;
