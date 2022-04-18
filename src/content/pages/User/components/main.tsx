import { useEffect, useRef } from 'react';
import MainContent from './mainContents';
import { Delete, FileCopy, Security } from '@mui/icons-material';
import { format } from 'date-fns'
const Main = ({
    users,
    init,
    pageSize,
    page,
    totalPage,
    rowCount
}: any) => {
    const ref = useRef();
    useEffect(() => {
        init();
    }, [])
    const tableColumns = [
        {
            headerName: 'Name',
            flex: 1,
            field: 'name'
        },
        {
            headerName: 'Email',
            field: 'email'
        },
        {
            headerName: 'Gender',
            field: 'gender'
        },
        {
            headerName: 'CreateAt',
            field: 'created_at',
            renderCell: (params) => (
                params?.value && <span>
                    {format(new Date(params.value), 'dd/MM/yyyy')}
                </span>
            )
        },
        {
            headerName: 'Date of Birth',
            field: 'birth',
            type: 'custom',
            renderCell: (params) => (
                params?.value && <span>
                    {format(new Date(params.value), 'dd/MM/yyyy')}
                </span>
            )
        },
        {
            field: 'actions',
            type: 'custom',
            headerName: 'Actions',
            renderCell: () => {
                return <>actions</>
            }
        }
    ]

    return (
        <>
            <MainContent
                users={users}
                ref={ref}
                tableColumns={tableColumns}
                pageSize={pageSize}
                page={page}
                totalPage={totalPage}
                rowCount={rowCount}
            />
        </>
    )
};

export default Main;
