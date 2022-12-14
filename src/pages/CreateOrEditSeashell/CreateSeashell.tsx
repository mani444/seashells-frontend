import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Button,
  useTheme,
  Box,
  Modal,
} from "@mui/material";
import Axios from "../../api/Axios";
import styles from "./CreateSeashell.module.css";

interface IProps {
  id?: string;
  setIsOpened: (value: boolean) => void;
  setId: (value: string | undefined) => void;
  getData: () => void;
}
export default function CreateSeashell({
  id,
  setIsOpened,
  setId,
  getData,
}: IProps) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(true);

  const handleClose = () => {
    setIsOpened(false);
    setOpen(false);
    setOpenCreate(false);
    setName("");
    setSpecies("");
    setDescription("");
  };

  const handleAddMoreSeashells = () => {
    setOpen(false);
    setOpenCreate(true);
    setName("");
    setSpecies("");
    setDescription("");
  };

  useEffect(() => {
    if (id && isEditable) {
      setIsEditable(false);
      Axios.get(`/seashells/${id}`).then((res) => {
        setName(res.data.name);
        setSpecies(res.data.species);
        setDescription(res.data.description);
      });
    }
  }, [isEditable, id]);
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = { name, species, description };
    if (id) {
      Axios.patch(`/seashells/${id}`, data).then((res) => {
        setId(undefined);
        handleClose();
        getData();
      });
    } else {
      Axios.post("/seashells", data).then((res) => {
        setOpenCreate(false);
        setOpen(true);
        getData();
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal} textAlign="center">
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                align="center"
                color="green"
                paddingBottom={3}
              >
                SEASHELL ADDED!
              </Typography>

              <Button
                color="primary"
                variant="contained"
                onClick={handleAddMoreSeashells}
                sx={{ marginBottom: "15px" }}
              >
                ADD MORE SEASHELLS
              </Button>
              <Button color="primary" variant="contained" onClick={handleClose}>
                CLOSE
              </Button>
            </Box>
          </Modal>
        )}
        {openCreate && (
          <Modal
            open={openCreate}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal} textAlign="center">
              <Typography
                component="h1"
                variant="h5"
                sx={{ paddingBottom: "15px" }}
              >
                {id ? "UPDATE SEASHELL" : "CREATE SEASHELL"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="species"
                      label="Species"
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    margin: theme.spacing(3, 0, 2),
                  }}
                >
                  {id ? "UPDATE" : "CREATE"}
                </Button>
              </form>
            </Box>
          </Modal>
        )}
      </div>
    </Container>
  );
}
