import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Axios from "../../axios/Axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreateSeashell.module.css";
export default function CreateSeashell() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  let { id } = useParams();
  //   console.log(id);

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
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = { name, species, description };
    if (id) {
      Axios.patch(`/seashells/${id}`, data).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    } else {
      Axios.post("/seashells", data).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography component="h1" variant="h5" sx={{ paddingBottom: "15px" }}>
          {id ? "EDIT SEASHELL" : "CREATE SEASHELL"}
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
            {id ? "EDIT" : "CREATE"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
