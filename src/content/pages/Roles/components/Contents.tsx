import { forwardRef, FC } from 'react';
import { Router, Link } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Card,
    Box,
    ButtonGroup,
    Button,
    TextField
} from '@mui/material';
import { AdminPanelSettings, Delete } from '@mui/icons-material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
interface iRecipeProps {
    roles: any[],
    tableColumns: any[],
    ref: any,
    pageSize: number,
    page: number,
    totalPage: number,
    rowCount: number,
    sortData: string,
    setSort: any,
}
const MainContent:FC<iRecipeProps> = forwardRef(({
    roles,
    tableColumns,
    pageSize,
    rowCount,
    setSort
},ref): JSX.Element => {
    return (
        <>
            <PageTitleWrapper>
                <PageTitle
                    heading="Role Management"
                    subHeading="Something"
                />
            </PageTitleWrapper>
            <Container maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Card>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    p: 1,
                                    m: 1,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                }}
                            >
                                <ButtonGroup>
                                    <Button 
                                        disabled 
                                        color="error" 
                                        variant="contained" 
                                        startIcon={<Delete className="m" />}
                                    >Delete</Button>
                                </ButtonGroup>
                                <TextField
                                    id="outlined-name"
                                    label="Find by name"
                                    // value='test'
                                    size="small"
                                    // onChange={handleChange}
                                />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <TableCustom
                                dataTable={roles}
                                idKey='id'
                                header={tableColumns}
                                sx={{ minWidth: "1500px" }}
                                styleRow={(rowCell: any): any => {
                                    // return object sx styled
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
});

export default MainContent;