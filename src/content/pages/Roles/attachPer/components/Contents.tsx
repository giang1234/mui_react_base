import { forwardRef, FC } from 'react';
import { 
    Container, 
    Grid, 
    Card,
    // Accordion,
    // AccordionSummary,
    // Typography,
    // AccordionDetails,
    Switch,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Table
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageTitle from 'src/components/PageTitle';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion children={''} disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMore />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
interface iRecipeProps {
    permissions: any[],
    ref: any,
    roleKey: any
}
const MainContent:FC<iRecipeProps> = forwardRef(({
    permissions,
    roleKey
},ref): JSX.Element => {
    return (
        <>
            <PageTitleWrapper>
                <PageTitle
                    heading="Attach permission"
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
                        {
                            roleKey && roleKey.map((v,i) => {
                                return (
                                    <Accordion key={i}>
                                        <AccordionSummary>
                                            <Typography>{v}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                            <TableContainer>
                                                <Table size='small'>
                                                    <TableBody>
                                                        {permissions[v] && permissions[v].map((e,j) => {
                                                            return (
                                                                <TableRow key={j}>
                                                                    <TableCell>
                                                                        {e.display_name || e.name}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {e.description}
                                                                    </TableCell>
                                                                    <TableCell style={{width: '200px'}}>
                                                                        <Switch checked={e.enable} onChange={(e) => {
                                                                            console.log(e);
                                                                        }} defaultChecked />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
});

export default MainContent;