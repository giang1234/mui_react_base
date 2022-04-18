import { useCallback, useEffect, useRef, useState } from 'react';
import MainContent from './Contents';
import { AdminPanelSettings, Delete, ModeEdit } from '@mui/icons-material';
import { Link } from 'react-router-dom'
const Main = ({
    roles,
    init,
    pageSize,
    page,
    totalPage,
    rowCount
}: any) => {
    const ref = useRef();
    const [sortData, setSort] = useState();

    useEffect(() => {
        init(sortData);
    }, [sortData])

    const onShowModalDetail = useCallback((id) => () => {
        console.log(id);
    }, []);

    const onShowModalDelete = useCallback((id) => () => {
        console.log(id);
    }, []);
    
    const tableColumns = [
        {
            headerName: 'Name',
            flex: 1,
            field: 'name'
        },
        {
            headerName: 'Description',
            flex: 1,
            field: 'description'
        },
        {
            headerName: 'Display name',
            flex: 1,
            field: 'display_name'
        },
        {
            type: 'custom',
            headerName: 'Actions',
            renderCell: (celvalues) => {
                return <>actions</>
            }
        }
    ]

    return (
        <>
            <MainContent
                roles={roles}
                ref={ref}
                tableColumns={tableColumns}
                pageSize={pageSize}
                page={page}
                totalPage={totalPage}
                rowCount={rowCount}
                sortData={sortData}
                setSort={setSort}
            />
        </>
    )
};

export default Main;