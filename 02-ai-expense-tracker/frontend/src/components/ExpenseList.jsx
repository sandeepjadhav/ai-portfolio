import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpenseList({ expenses, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Category</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {expenses.map((e) => (
          <TableRow key={e.id}>
            <TableCell>{e.date}</TableCell>
            <TableCell>{e.description}</TableCell>
            <TableCell>{e.category}</TableCell>
            <TableCell align="right">₹{e.amount}</TableCell>
            <TableCell>
              <IconButton onClick={() => onDelete(e.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
