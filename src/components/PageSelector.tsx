import { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../store/store';
import { StoreState } from '../store/store';
import { useAppDispatch } from '../store/store';
import { fetchCharacters } from '../store/characterSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 60,
    },
  },
};



function getStyles(name: string, theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular
  };
}

export default function PageSelector() {

    const dispatch=useAppDispatch()
    const fetchedCharacters = useAppSelector((state:StoreState)=> state.character)
    const totalPages = Array.from({length: fetchedCharacters.info.pages}, (_, i) => i + 1)
    const theme = useTheme();
    const [pageNr, setPageNr] = useState("");

    const handleChange = (event: SelectChangeEvent<typeof pageNr>) => {
        dispatch(fetchCharacters(Number(event.target.value)))
        const {
        target: { value },
        } = event;
        setPageNr(value)
    };

    return (
        <div>
        <FormControl sx={{ m: 1, width: 65, mt: 3 }}>
            <Select
            value={String(fetchedCharacters.info.currentPage)}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
                return <em>{String(fetchedCharacters.info.currentPage)}</em>;
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            >
            {totalPages.map((pageNum) => (
                <MenuItem
                key={pageNum}
                value={pageNum}
                style={getStyles(String(pageNum), theme)}
                >
                {pageNum}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}
