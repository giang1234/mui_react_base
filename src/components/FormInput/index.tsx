import { FC } from 'react';
import { Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DateTimePicker, TimePicker, MobileDatePicker, DesktopDatePicker } from '@mui/lab';

interface FormInputProps {
    type?: string;
    isEdit?: boolean;
    label?: string;
    name?: string;
    value: any;
    onChange?: any;
    dataSelect?: any[],
    error?: any,
    helperText?: any,
    noLable?: any,
    disabled?: boolean,
    onClose?: any,
    minDateTime?: any,
    maxDateTime?: any
}
const renderTypeInput = (
    type: string = 'text',
    value: any = '',
    name: string = '',
    onChange?: any,
    dataSelect?: any[],
    error?: any,
    helperText?: any,
    label?: string,
    rest?: any,
    noLable?: any,
): JSX.Element => {
    switch (type) {
        case 'textbox':
        case 'textbox-password':
            return <TextField type={type === 'textbox-password' ? 'password' : 'text'} sx={{ width: "100%" }}
                {...rest}
                value={value} size="small"
                variant="outlined" name={name}
                onChange={onChange}
                error={error}
                helperText={helperText}
            />
        case 'selectbox':
        case 'selectbox-multipe':
            return <FormControl size="small" sx={{ width: "100%" }}>
                {noLable && <InputLabel sx={{ background: 'white' }} id="demo-customized-select-label">{label}</InputLabel>}
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    sx={{ width: "100%" }}
                >
                    {dataSelect.map((item: any) => (
                        <MenuItem
                            key={item.value}
                            value={item.value}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        case "selectDate":
            return <DesktopDatePicker
                {...rest}
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField sx={{ width: '100%' }} size='small' {...params} />}
            />
        case "dateTime":
            return <DateTimePicker
                {...rest}
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField sx={{ width: '100%' }} size='small' {...params} />}
            />
        case "time":
            return <TimePicker
                {...rest}
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField sx={{ width: '100%' }} size='small' {...params} />}
            />
        case "dateMedia":
            return <MobileDatePicker
                {...rest}
                label={label}
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField sx={{ width: '100%' }} size='small' {...params} />}
            />
        default:
            return <Typography sx={{ width: "100%" }} mt={1}>{value}</Typography>
    }
}
const FormInput: FC<FormInputProps> = ({
    type = 'text',
    isEdit = true,
    label = '',
    name = '',
    value = '',
    onChange = null,
    dataSelect = [],
    error = '',
    helperText = '',
    noLable = false,
    ...rest
}) => {
    return (
        <Box sx={{ display: 'flex', marginY: 1 }}>
            {!noLable && <Typography sx={{ width: '30%', fontWeight: 'bold' }} mt={1}>{label}</Typography>}
            <Box sx={{ width: (noLable ? "100%" : "70%") }}>
                {renderTypeInput(type, value, name, onChange, dataSelect, error, helperText, label, rest, noLable)}
            </Box>
        </Box>
    );
};

export default FormInput;
