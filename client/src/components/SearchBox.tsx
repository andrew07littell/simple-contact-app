import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link } from "react-router-dom";

interface SearchBoxProps {
  onSearch: (query: string, type: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<string>("Name");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value, searchType);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search contacts ..."
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <FormControl variant="standard" sx={{ m: 1 }}>
        <Select value={searchType} onChange={handleTypeChange} label="Search">
          <MenuItem value={"Name"}>Name</MenuItem>
          <MenuItem value={"PhoneNumber"}>Phone</MenuItem>
          <MenuItem value={"Tag"}>Tag</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Link to="/create">
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <AddIcon />
        </IconButton>
      </Link>
    </Paper>
  );
};

export default SearchBox;
