import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";
import { Button } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";

const initialRow = { 
    serialNumber: 1, projectPhase: '', plannedDate: '', actualDate: '', 
    completionPercentage: '', daysInStage: '' 
  };
  
const initialRow1 = { 
    serialNumber: 1, projectPhase: '', plannedDate: '', actualDate: '', 
    completionPercentage: '', daysInStage: '' 
};

const initialRow2 = { 
    serialNumber: 1, noteAttach: '', uploadType: '', fileUpload: null, 
    date: ''
};

const initialRow3 = { 
    serialNumber: 1, paMfPartner: '', paEmsPartner: '', paFabPartner: '', 
    linkPart: ''
};

const initialRow4 = { 
    serialNumber: 1, linkCusPo: '', linkPart: '', quantity: 'null', 
    Delivered: '',plannedDate: '', actualDate: '', cusAcceptedQuan: ''
};

const TestForm = () =>{

    const [rows1, setRows1] = useState([initialRow1]);
    const [rows2, setRows2] = useState([initialRow2]);
    const [rows3, setRows3] = useState([initialRow3]);
    const [rows4, setRows4] = useState([initialRow4]);

    // Generic function to add a row
    const handleAddRow = (setRowFn, rows) => {
        const newRow = {
        serialNumber: rows.length + 1, // Automatically increment serial number
        projectPhase: '', plannedDate: '', actualDate: '', 
        completionPercentage: '', daysInStage: ''
        };
        setRowFn([...rows, newRow]);
    };

    // Generic function to remove a row
    const handleRemoveRow = (index, setRowFn, rows) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);

        // Recalculate serial numbers after removing a row
        updatedRows.forEach((row, idx) => {
        row.serialNumber = idx + 1;
        });

        setRowFn(updatedRows);
    };
        
    // Generic function to handle input change
    const handleInputChange = (index, field, value, setRowFn, rows) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRowFn(updatedRows);
    }; 

    const proCategoryProps = {
        options: proCategory,
        getOptionLabel: (option) => option.title,
    };
    const salesPersonProps = {
        options: salesPerson,
        getOptionLabel: (option) => option.title,
    };

    const sourceManagerProps = {
        options: sourceManager,
        getOptionLabel: (option) => option.title,
    };
    const assignProManagerProps = {
        options: assignProManager,
        getOptionLabel: (option) => option.title,
    };

    const currentProFaceProps = {
        options: currentProFace,
        getOptionLabel: (option) => option.title,
    };
    const customerOrganisationProps = {
        options: customerOrganisation,
        getOptionLabel: (option) => option.title,
    };
    const customerPOCProps = {
        options: customerPOC,
        getOptionLabel: (option) => option.title,
    };
    const uploadTypeProps = {
        options: uploadType,
        getOptionLabel: (option) => option.title,
    };

    const paMfPartnerProps = {
        options: paMfPartner,
        getOptionLabel: (option) => option.title,
    };
    const paEmsPartnerProps = {
        options: paEmsPartner,
        getOptionLabel: (option) => option.title,
    };
    const paFabPartnerProps = {
        options: paFabPartner,
        getOptionLabel: (option) => option.title,
    };
    const linkPartProps = {
        options: linkPart,
        getOptionLabel: (option) => option.title,
    };
    const linkCusPoProps = {
        options: linkCusPo,
        getOptionLabel: (option) => option.title,
    };
    const DeliveredProps = {
        options: Delivered,
        getOptionLabel: (option) => option.title,
    };
    
  // Function to handle planned date changes at the row level
  const handlePlannedDateChange = (index, date, rows, setRows) => {
    const updatedRows = [...rows];
    updatedRows[index].plannedDate = date;

    // If the actual date is earlier than the planned date, reset the actual date
    if (updatedRows[index].actualDate && new Date(date) > new Date(updatedRows[index].actualDate)) {
      updatedRows[index].actualDate = '';
    }

    setRows(updatedRows);
  };

  // Function to handle actual date changes at the row level
    const handleActualDateChange = (index, date, rows, setRows) => {
    const updatedRows = [...rows];
    const plannedDate = updatedRows[index].plannedDate;

    updatedRows[index].actualDate = date;

    // If the planned date is not set or is later than the actual date, adjust the planned date
    if (!plannedDate || new Date(date) < new Date(plannedDate)) {
      updatedRows[index].plannedDate = date;
    }

    setRows(updatedRows);
  };

//   const [file, setFile] = useState(null);

  // Function to handle file change at the row level
    const handleFileChange = (index, event) => {
        const selectedFile = event.target.files[0];
        const updatedRows = [...rows2];
        updatedRows[index].fileUpload = selectedFile; // Store file in the respective row
        setRows2(updatedRows);
    };

    return (
        <>
        <style>{
            `
            td {
                min-width: 100px;
            }
            .clsBtn{
                border: none;
                font-size: 23px;
                display: contents;
            }
            .css-1a7z5rc-MuiButtonBase-root-MuiIconButton-root{
                padding:2px!important;
            }
            th{
              white-space:nowrap;  
              font-weight:500;
              font-size:14px;
            }
            h5 {color:#606060!important;}
            `
        }
        </style>
            <Card variant="outlined">
                <CardContent>
                    <div className="row mb-4">
                        <h5>Create Buyer PO</h5>
                        <hr/>

                        <div className='col-md-4 mt-3'>
                            <Stack spacing={1} >
                                <Autocomplete
                                {...proCategoryProps}
                                id=""
                                renderInput={(params) => (
                                <TextField {...params} label="Buyer Details" className='w-100'
                                id="outlined-size-small"
                                
                                size="small"/>
                                )}
                                />    
                            </Stack>                                                                                     
                        </div>

                        <div className='col-md-4 mt-3'>
                            <Stack spacing={1} >
                                <Autocomplete
                                {...salesPersonProps}
                                id=""
                                renderInput={(params) => (
                                <TextField {...params} label="Delivery Status" 
                                id="outlined-size-small"
                                
                                size="small" className='w-100'/>
                                )}
                                />    
                            </Stack>                                                                                     
                        </div>

                        <div className="col-md-4 mt-3">
                            <TextField label="Discount Type" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-3">
                            <TextField label="Buyer Name" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-3">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className="w-100"
                                    label="Buyer PO Date"
                                    format="dd-MM-yyyy" // Custom date format
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="col-md-4 mt-3">
                            <TextField label="Buyer PO Number" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-3">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className="w-100"
                                    label=" PO Received Date"
                                    format="dd-MM-yyyy" // Custom date format
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="col-md-4 mt-3">
                            <TextField label="Actual Recs" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-3">
                            <TextField label="Indent No" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>
                      
                        <div className='col-md-4 mt-4'>
                            <Stack spacing={1} >
                                <Autocomplete
                                {...sourceManagerProps}
                                id=""
                                renderInput={(params) => (
                                <TextField {...params} label="PO Status" className='w-100'
                                id="outlined-size-small"
                                
                                size="small"/>
                                )}
                                />    
                            </Stack>                                                                                     
                        </div>

                        <div className="col-md-4 mt-4">
                            <TextField label="Attachment Done" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-3">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className="w-100"
                                    label="Customer Due Delivery Date"
                                    format="dd-MM-yyyy" // Custom date format
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className='col-md-4 mt-4'>
                            <Stack spacing={1} >
                                <Autocomplete
                                {...assignProManagerProps}
                                id=""
                                renderInput={(params) => (
                                <TextField {...params} label="Tax Type" className='w-100'
                                id="outlined-size-small"
                                
                                size="small"/>
                                )}
                                />    
                            </Stack>                                                                                     
                        </div>

                        <div className="col-md-4 mt-4">
                            <TextField label="RFQ ID" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-4">
                            <TextField label="PO Item Name Same as RFQ Item Name" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-4">
                            <TextField label="Added User" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>

                        <div className="col-md-4 mt-4">
                            <TextField label="Redirect Portal" className='w-100'
                            id="outlined-size-small"
                            size="small"/>
                        </div>
                        
                    </div>

                    <hr/>
                    
                    {/*------------------------------------*/}

                    <div className="row">
                        <h5> Item Details </h5>
                        <div className="table-responsive px-1 mb-0">
                            <table className="table">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Item Code</th>
                                    <th>RFQ Item ID</th>
                                    <th>RFQ Item Name</th>
                                    <th>PO Item Name</th>
                                    <th>Item Description</th>
                                    <th>HSN</th>
                                    <th>PO Quantity</th>
                                    <th>UOM</th>
                                    <th>UOM Name</th>
                                    <th>Rate</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Tax name</th>
                                    <th>Amount</th>
                                    <th>PO Item Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows1.map((row, index) => (
                                <tr key={index}>
                                    <td style={{width:'75px'}}>
                                    <TextField
                                        label=""
                                        className="w-100"
                                        size="small"
                                        value={row.serialNumber}
                                        disabled // Serial Number is auto-generated and not editable
                                    />
                                    </td>
                                    <td>
                                    <TextField
                                        className="w-100"
                                        size="small"
                                        value=''
                                    />
                                    </td>
                                    <td>
                                        <Stack spacing={1} >
                                            <Autocomplete
                                            {...uploadTypeProps}
                                            id=""
                                            renderInput={(params) => (
                                            <TextField {...params} label="" className='w-100'
                                            id="outlined-size-small"
                                            
                                            size="small"/>
                                            )}
                                            />    
                                        </Stack>                                                                                      
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    {/* <td>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            className="w-100"
                                            label=""
                                            value={row.plannedDate || null}
                                            onChange={(date) => handlePlannedDateChange(index, date, rows1, setRows1)}
                                            format="dd-MM-yyyy" // Custom date format
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </LocalizationProvider>
                                    </td>
                                    <td>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            className="w-100"
                                            label=""
                                            value={row.actualDate || null}
                                            onChange={(date) => handleActualDateChange(index, date, rows1, setRows1)}
                                            format="dd-MM-yyyy" // Custom date format
                                            minDate={row.plannedDate} // Disable dates before the selected planned date
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        </LocalizationProvider>
                                    </td> */}
                                    <td>
                                        <Stack spacing={1} >
                                            <Autocomplete
                                            {...uploadTypeProps}
                                            id=""
                                            renderInput={(params) => (
                                            <TextField {...params} label="" className='w-100'
                                            id="outlined-size-small"
                                            
                                            size="small"/>
                                            )}
                                            />    
                                        </Stack>                                                                                      
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    {/* <td>
                                    <TextField
                                        label=""
                                        className="w-100"
                                        size="small"
                                        value={row.daysInStage}
                                        onChange={(e) => handleInputChange(index, 'daysInStage', e.target.value, setRows1, rows1)}
                                    />
                                    
                                    </td> */}
                                    <td>
                                        <Stack spacing={1} >
                                            <Autocomplete
                                            {...uploadTypeProps}
                                            id=""
                                            renderInput={(params) => (
                                            <TextField {...params} label="" className='w-100'
                                            id="outlined-size-small"
                                            
                                            size="small"/>
                                            )}
                                            />    
                                        </Stack>                                                                                      
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            className="w-100"
                                            size="small"
                                            value=''
                                        />
                                    </td>
                                    <td>
                                        <Stack spacing={1} >
                                            <Autocomplete
                                            {...uploadTypeProps}
                                            id=""
                                            renderInput={(params) => (
                                            <TextField {...params} label="" className='w-100'
                                            id="outlined-size-small"
                                            
                                            size="small"/>
                                            )}
                                            />    
                                        </Stack>                                                                                      
                                    </td>
                                    <td>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className="clsBtn"
                                            onClick={() => handleRemoveRow(index, setRows1, rows1)}
                                            disabled={rows1.length === 1} // Prevent removing the last row
                                        >
                                            <IoCloseCircleOutline />
                                        </Button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>

                            <Button
                                sx={{ mb:2}}
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddRow(setRows1, rows1)}>
                                Add More
                            </Button>
                        </div>
                    </div>

                    <hr/>
                    {/*------------------------------------*/}

                    <div className="row">
                            <div className="col-md-4 mt-4">
                                <TextField label="Buyer PO Subtotal" className='w-100'
                                id="outlined-size-small"
                                size="small"/>
                            </div>

                            <div className="col-md-4 mt-4">
                                <TextField label="Line Items" className='w-100'
                                id="outlined-size-small"
                                size="small"/>
                            </div>

                            <div className="col-md-4 mt-4">
                                <TextField label="Taxes" className='w-100'
                                id="outlined-size-small"
                                size="small"/>
                            </div>

                            <div className="col-md-4 mt-4">
                                <TextField label="PO Balance" className='w-100'
                                id="outlined-size-small"
                                size="small"/>
                            </div>

                            <div className="col-md-4 mt-4">
                                <TextField label="Buyer PO Total Value" className='w-100'
                                id="outlined-size-small"
                                size="small"/>
                            </div>

                            <div className="col-md-4 mt-4">
                                <TextField label="Upload PO" className='w-100'
                                id="outlined-size-small"
                                size="small"/>
                            </div>
                    </div>
                        <Button
                            sx={{ my:2}}
                            variant="contained"
                            color="primary">
                            Update
                        </Button>
                   
                </CardContent>
                </Card>
        </>
    )
}
export default TestForm

const proCategory = [
    { title: 'Category 1' },
    { title: 'Category 2' },
    { title: 'Category 3' },
    { title: 'Category 4' }
];

const salesPerson = [
    { title: 'Sales Person 1' },
    { title: 'Sales Person 2' },
    { title: 'Sales Person 3' },
    { title: 'Sales Person 4' }
];

const sourceManager = [
    { title: 'Source Manager 1' },
    { title: 'Source Manager 2' },
    { title: 'Source Manager 3' },
    { title: 'Source Manager 4' }
];

const assignProManager = [
    { title: 'Assigned Project Manager 1' },
    { title: 'Assigned Project Manager 2' },
    { title: 'Assigned Project Manager 3' },
    { title: 'Assigned Project Manager 4' }
];

const currentProFace = [
    { title: 'Phase 1' },
    { title: 'Phase 2' },
    { title: 'Phase 3' },
    { title: 'Phase 4' }
];

const customerOrganisation = [
    { title: 'Oraganisation 1' },
    { title: 'Oraganisation 2' },
    { title: 'Oraganisation 3' },
    { title: 'Oraganisation 4' }
];

const customerPOC = [
    { title: 'POC 1' },
    { title: 'POC 2' },
    { title: 'POC 3' },
    { title: 'POC 4' }
];

const uploadType = [
    { title: 'Type 1' },
    { title: 'Type 2' },
    { title: 'Type 3' },
    { title: 'Type 4' }
];


const paMfPartner = [
    { title: 'MF Partner 1' },
    { title: 'MF Partner 2' },
    { title: 'MF Partner 3' },
    { title: 'MF Partner 4' }
];

const paEmsPartner = [
    { title: 'EMS Partner 1' },
    { title: 'EMS Partner 2' },
    { title: 'EMS Partner 3' },
    { title: 'EMS Partner 4' }
];

const paFabPartner = [
    { title: 'Fab Partner 1' },
    { title: 'Fab Partner 2' },
    { title: 'Fab Partner 3' },
    { title: 'Fab Partner 4' }
];

const linkPart = [
    { title: 'Link Part 1' },
    { title: 'Link Part 2' },
    { title: 'Link Part 3' },
    { title: 'Link Part 4' }
];

const linkCusPo = [
    { title: 'Link Customer PO 1' },
    { title: 'Link Customer PO 2' },
    { title: 'Link Customer PO 3' },
    { title: 'Link Customer PO 4' }
];

const Delivered= [
    { title: 'Yes' },
    { title: 'No' }
];
