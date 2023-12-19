import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function PoolTable() {

    const pools = [
        {'name': 'Pool 1'},
    ];

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow hover>
                        <TableCell>Pool Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pools.map((pool) => (
                        <TableRow hover key={pool.name}>
                            <TableCell component="th" scope="row">
                                {pool.name}
                            </TableCell>
                            <TableCell>
                                <Button >Open</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </TableContainer>
    );

}

export default PoolTable;