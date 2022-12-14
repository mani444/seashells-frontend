import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Box,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Axios from "../../api/Axios";
import { Link } from "react-router-dom";
// import { ISeashells } from "../../interfaces/interfaces";
import SeashellRow from "../../components/SeashellRow";
import styles from "./Seashell.module.css";
import { getSeashells } from "../../redux/seashell/seashellThunk";
// import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
export default function Seashell() {
  // const [seashells, setSeaShells] = useState<ISeashells[]>([]);

  const dispatch = useAppDispatch();
  const seashellsArr = useAppSelector((state) => state.seashell);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getSeashells());
  }, [dispatch]);

  const UpdateUser = (id?: string) => {
    navigate("/update/" + id);
  };

  const UserDelete = async (id?: string) => {
    await Axios.delete(`/seashells/${id}`)
      .then((res) => {
        dispatch(getSeashells());
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Container
        sx={{
          marginTop: theme.spacing(5),
        }}
        maxWidth="lg"
      >
        <Paper
          sx={{
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            width: "100%",
            overflow: "hidden",
          }}
          elevation={3}
        >
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                SEASHELLS
              </Typography>
            </Box>
            <Box>
              <Link to="/create" className={styles.link}>
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer sx={{ maxHeight: 740 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Species</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seashellsArr
                  ? seashellsArr.map((user) => (
                      <SeashellRow
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        species={user.species}
                        description={user.description}
                        UpdateUser={() => UpdateUser(user.id)}
                        UserDelete={() => UserDelete(user.id)}
                      />
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
