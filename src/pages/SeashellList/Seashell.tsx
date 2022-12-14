import { useEffect, useState } from "react";
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
import { ISeashells } from "../../interfaces/interfaces";
import SeashellRow from "../../components/SeashellRow";
import CreateSeashell from "../CreateOrEditSeashell/CreateSeashell";
export default function Seashell() {
  const [seashells, setSeaShells] = useState<ISeashells[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [id, setId] = useState<string>();

  const theme = useTheme();

  const getData = async () => {
    const response = await Axios.get("/seashells");
    setSeaShells(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const UpdateUser = (id?: string) => {
    setId(id);
    setIsOpened(true);
  };

  const UserDelete = async (id?: string) => {
    await Axios.delete(`/seashells/${id}`)
      .then((res) => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  const handleCreateClick = () => {
    console.log("a");

    setIsOpened(true);
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
              {/* <Link to="/create" className={styles.link}> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
              >
                CREATE
              </Button>
              {/* </Link> */}
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
                {seashells
                  ? seashells.map((user) => (
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
      {isOpened && (
        <CreateSeashell
          setIsOpened={setIsOpened}
          id={id}
          setId={setId}
          getData={getData}
        />
      )}
    </div>
  );
}
