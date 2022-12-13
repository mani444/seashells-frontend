import { TableRow, TableCell, ButtonGroup, Button } from "@mui/material";
interface IRowProps {
  id?: string;
  name: string;
  species: string;
  description: string;
  UpdateUser: () => void;
  UserDelete: () => void;
}

const SeashellRow = ({
  id,
  name,
  species,
  description,
  UpdateUser,
  UserDelete,
}: IRowProps) => {
  return (
    <TableRow>
      <TableCell align="center">{id}</TableCell>

      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{species}</TableCell>
      <TableCell align="left">{description}</TableCell>
      <TableCell align="center">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={UpdateUser}>Edit</Button>
          <Button onClick={UserDelete}>Del</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default SeashellRow;
