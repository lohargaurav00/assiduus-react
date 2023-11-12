import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const Form = ({ handleClose }: { handleClose: () => void }) => {

  const [data, setData] = useState({ fileName: "", file: "uploaded file" });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleClose();
    console.log(data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        label="File Name"
        onChange={(e) => {
          setData({ ...data, fileName: e.target.value });
        }}
        required
        variant="outlined"
        color="secondary"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        value={data.fileName}
      />
      <TextField
        label="Upload File"
        required
        variant="standard"
        color="secondary"
        type="file"
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="outlined" color="secondary" type="submit">
        submit
      </Button>
    </form>
  );
};

export default Form;
