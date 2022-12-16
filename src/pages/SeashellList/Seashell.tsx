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
  Alert,
  Snackbar,
  AlertColor,
} from "@mui/material";
import Axios from "../../api/Axios";
import SeashellRow from "../../components/SeashellRow";
import { getSeashells } from "../../redux/seashell/seashellThunk";
import CreateSeashell from "../CreateOrEditSeashell/CreateSeashell";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CircularSpinner } from "../../components/Spinner";
export default function Seashell() {
  const [isOpened, setIsOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (message: string, alertType: string) => {
    setMsg(message);
    setAlertType(alertType);
    setOpen(true);
  };

  const handleCls = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [id, setId] = useState<string>();

  const dispatch = useAppDispatch();
  const seashellsArr = useAppSelector((state) => state.seashell);
  const theme = useTheme();
  const UpdateUser = (id?: string) => {
    setId(id);
    setIsOpened(true);
  };
  const handleCreateClick = () => {
    setIsOpened(true);
  };
  const UserDelete = async (id?: string) => {
    await Axios.delete(`/seashells/${id}`)
      .then((res) => {
        handleClick("Seashell Deleted!", "success");
        dispatch(getSeashells());
      })
      .catch((err) => {
        handleClick(err.message, "error");
      });
  };
  useEffect(() => {
    dispatch(getSeashells(setIsLoading));
  }, [dispatch]);

  return (
    <div>
      {isLoading && <CircularSpinner backdropAlpha={false}></CircularSpinner>}

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleCls}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCls}
          severity={alertType as AlertColor}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
              >
                CREATE
              </Button>
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
                  ? seashellsArr.map(
                      (user) =>
                        user.id !== "" && (
                          <SeashellRow
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            species={user.species}
                            description={user.description}
                            UpdateUser={() => UpdateUser(user.id)}
                            UserDelete={() => UserDelete(user.id)}
                          />
                        )
                    )
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
          handleClick={handleClick}
        />
      )}
    </div>
  );
}
