import { Container, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {  RequestArrProps} from '../../types/requestInterface'
import ViewRequest from '../modals/ViewRequest';
import { deleteRequest , updateRequest } from '../../services/requestApi'; 


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '& td, & th': {
      height: '40px', 
      padding: '8px',
      boxSizing: 'border-box',
    },
  }));

const RequestData: React.FC<RequestArrProps> = ({ data }) => {

  const delRequest = async (id: number) => {
      try {
        const response = await deleteRequest({id});
        console.log('Request deleted successfully:', response);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting Request:', error);
      }
    };

  const approve = async (id: number)=>{
      try {
        const response = await updateRequest(id);
        console.log('Request updated successfully:', response);
        window.location.reload();
      } catch (error) {
        console.error('Error updating Request:', error);
      }
  }

  const sortedData = [...data].sort((a, b) => {
    const statusOrder = ['Pending', 'Approved'];
    
    const statusA = statusOrder.indexOf(a.request_status);
    const statusB = statusOrder.indexOf(b.request_status);

    return statusA - statusB;
  });

  
  return (
    <Container className="py-8 overflow-y-auto">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
                <TableCell align="center" >
                    ID
                </TableCell>
                <TableCell align="center" >
                    Fullname
                </TableCell>
                <TableCell align="center" >
                    Date
                </TableCell>
                <TableCell align="center" >
                    Status
                </TableCell>
                <TableCell align="center" >
                    Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((request) => {
              return (
                <StyledTableRow key={request.request_id}>
                  <StyledTableCell align="center">{request.request_id}</StyledTableCell>
                  <StyledTableCell align="center">{request.fullname}</StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(request.request_date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">{request.request_status}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                    }}
                  >
                    <ViewRequest data={[request]} />
                    <Button
                        onClick={request.request_status === "Approved" ? () => approve(request.request_id) : undefined}
                        variant="outlined"
                        disabled={request.request_status === "Approved"}
                        sx={{
                          borderColor: request.request_status === "Approved" ? 'grey' : '#19B37E',
                          color: request.request_status === "Approved" ? 'grey' : '#19B37E',
                          padding: 0,
                          textTransform: 'none',
                          width: '60px',
                          height: '30px'
                            }}
                        > 
                          Approve
                    </Button>
                    <Button 
                      onClick={() => delRequest(request.request_id)} 
                      variant="outlined" 
                      color="error" 
                      sx={{ padding: 0, textTransform: 'none', width: '60px', height: '30px' }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default RequestData
