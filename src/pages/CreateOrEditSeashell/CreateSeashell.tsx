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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./CreateSeashell.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  createSeashells,
  editSeashells,
} from "../../redux/seashell/seashellThunk";
export default function CreateSeashell() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const dispatch = useAppDispatch();

  let { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setSpecies("");
    setDescription("");
  };
  const seashellsArr = useAppSelector((state) => state.seashell);
  useEffect(() => {
    if (id && isEditable) {
      //GET FROM REDUX

      const seashell = seashellsArr.find(
        (x) => x.id?.toString() === id?.toString()
      );
      if (seashell) {
        setName(seashell.name);
        setSpecies(seashell.species);
        setDescription(seashell.description);
      }
      setIsEditable(false);

      //GET FROM SERVER
      // Axios.get(`/seashells/${id}`).then((res) => {
      //   setName(res.data.name);
      //   setSpecies(res.data.species);
      //   setDescription(res.data.description);
      // });
    }
  }, [isEditable, id, seashellsArr]);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      await dispatch(
        editSeashells({ id, name, species, description })
      ).unwrap();

      navigate("/");
    } else {
      await dispatch(createSeashells({ name, species, description })).unwrap();
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        {open ? (
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
                {" "}
                SEASHELL ADDED
              </Typography>
              <Button
                onClick={handleClose}
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
              >
                ADD MORE SEASHELLS
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="contained"
                color="primary"
              >
                SEASHELLS DASHBOARD
              </Button>
            </Box>
          </Modal>
        ) : null}
        <Typography component="h1" variant="h5" sx={{ paddingBottom: "15px" }}>
          {id ? "UPDATE SEASHELL" : "ADD SEASHELL"}
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
            {id ? "UPDATE" : "ADD"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
