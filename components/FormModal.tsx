import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import Form from "./From";
import { blue } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid var(--text-tertiary)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const FormModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: "var(--green-primary)",
          backgroundColor: blue[100],
          textTransform: "capitalize",
          fontWeight: "bold",

          "&:hover": {
            backgroundColor: blue[200],
          },
        }}
      >
        New Sales Invoice
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
