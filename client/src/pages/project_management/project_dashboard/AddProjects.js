import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";

import useFetchCustomDataV1 from "../../../components/hooks/fetchCustomApiv1";
import { APILinkRoutes } from "../../../components/apiLinks/APILinkRoutes";

const initialRow = {
  serialNumber: 1,
  projectPhase: "ENGINEERING DISCUSSIONS",
  plannedDate: "",
  actualDate: "",
  completionPercentage: "8",
  daysInStage: "",
};

const initialRow1 = {
  serialNumber: 1,
  projectPhase: "",
  plannedDate: "",
  actualDate: "",
  completionPercentage: "",
  daysInStage: "",
};

const initialRow2 = {
  serialNumber: 1,
  noteAttach: "",
  uploadType: "",
  fileUpload: null,
  date: "",
};

const initialRow3 = {
  serialNumber: 1,
  paMfPartner: "",
  paEmsPartner: "",
  paFabPartner: "",
  linkPart: "",
};

const initialRow4 = {
  serialNumber: 1,
  linkCusPo: "",
  linkPart: "",
  quantity: "null",
  Delivered: "",
  plannedDate: "",
  actualDate: "",
  cusAcceptedQuan: "",
};

const currentProjectPhaseMndF = [
  { phase: "ENGINEERING DISCUSSIONS", completion: 6 },
  { phase: "PRICE DISCOVERY", completion: 12 },
  { phase: "REQUIREMENT DISCUSSION", completion: 18 },
  { phase: "PARTNER ENGAGEMENT/RFQ RESPONSE", completion: 24 },
  { phase: "SAMPLE MANUFACTURING", completion: 30 },
  { phase: "SAMPLE SHIPMENT", completion: 36 },
  { phase: "SAMPLE-QUALITY CONTROL", completion: 42 },
  { phase: "AWAITING CUSTOMER PO", completion: 48 },
  { phase: "CUSTOMER PO OBTAINED", completion: 54 },
  { phase: "PARTNER PO PROCESSING", completion: 60 },
  { phase: "PRODUCTION SET-UP", completion: 66 },
  { phase: "IN PRODUCTION", completion: 72 },
  { phase: "QUALITY CONTROL", completion: 78 },
  { phase: "PACKAGING & SHIPMENT", completion: 84 },
  { phase: "AWAITING PARTNER SHIPMENT", completion: 90 },
  { phase: "DELIVERED", completion: 100 },
  // { phase: "ON HOLD", completion: 72 },
  // { phase: "CANCELLED", completion: 72 },
];

const currentProjectPhaseFab = [
  { phase: "RFQ LOGGED", completion: 8 },
  { phase: "BOM Preparation from GA Assembly Drawing", completion: 16 },
  { phase: "TECHNICAL QUERIES/ PREBID MEETINGS", completion: 24 },
  { phase: "SITE VISIT", completion: 32 },
  {
    phase: "MAN & MACHINE CALCULATION BASED ON PROJECT SCHEDULING",
    completion: 40,
  },
  { phase: "PREPARATION OF QUOTATION", completion: 48 },
  { phase: "APPROVAL FROM FINANCE & MANAGEMENT", completion: 56 },
  { phase: "OFFER SUBMISSION", completion: 64 },
  { phase: "ORDER EXECUTION", completion: 72 },
  { phase: "DELIVERED", completion: 100 },
  // { phase: "ON HOLD", completion: 72 },
  // { phase: "CANCELLED", completion: 72 },
];

//   { phase: "RFQ LOGGED" },
//   { phase: "BOM Preparation from GA Assembly Drawing" },
//   { phase: "TECHNICAL QUERIES/ PREBID MEETINGS" },
//   { phase: "SITE VISIT" },
//   { phase: "MAN & MACHINE CALCULATION BASED ON PROJECT SCHEDULING" },
//   { phase: "PREPARATION OF QUOTATION" },
//   { phase: "APPROVAL FROM FINANCE & MANAGEMENT" },
//   { phase: "OFFER SUBMISSION" },
//   { phase: "ORDER EXECUTION" },

const AddProject = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projectPhaseCurrent, setProjectPhaseCurrent] = useState(null);

  const { data } = useFetchCustomDataV1(APILinkRoutes.AddRfqsRoute);

  const projectNumbers = React.useMemo(
    () => data?.project_nos?.all_project_nos || [],
    [data]
  );
  const customerLists = React.useMemo(
    () => data?.Customer_names?.all_cust_names || [],
    [data]
  );

  // console.log("det ", data);

  const [rows1, setRows1] = useState([initialRow]);
  const [rows2, setRows2] = useState([initialRow1]);
  const [rows3, setRows3] = useState([initialRow2]);
  const [rows4, setRows4] = useState([initialRow3]);

  const handleCategoryChange = (event, newValue) => {
    // console.log("Selected value:", newValue);
    setSelectedCategory(newValue);
  };

  const handleProjectPhaseChange = (phase) => {
    setProjectPhaseCurrent(phase);
  };

  // Generic function to add a row
  //   const handleAddRow = (setRowFn, rows) => {
  //     const newRow = {
  //       serialNumber: rows.length + 1, // Automatically increment serial number
  //       projectPhase: "",
  //       plannedDate: "",
  //       actualDate: "",
  //       completionPercentage: "",
  //       daysInStage: "",
  //     };
  //     setRowFn([...rows, newRow]);
  //   };

  const handleAddRow = (setRows1, rows1) => {
    // Make sure selectedCategory is correctly used here
    let currentProjectPhase = [];

    if (selectedCategory && selectedCategory.hasOwnProperty("category")) {
      console.log("Selected Category:", selectedCategory.category);
      if (selectedCategory && selectedCategory.category?.includes("M&F")) {
        console.log("Category includes 'M&F'");
        currentProjectPhase = currentProjectPhaseMndF;
      } else if (
        selectedCategory &&
        selectedCategory.category?.includes("FAB")
      ) {
        console.log("Category includes 'FAB'");
        currentProjectPhase = currentProjectPhaseFab;
      } else {
        console.log("Category does not include 'M&F' or 'FAB'");
      }

      const newSerialNumber = rows1.length + 1;
      const phaseIndex = (newSerialNumber - 1) % currentProjectPhase.length;

      if (newSerialNumber <= currentProjectPhase.length) {
        const newProjectPhase = currentProjectPhase[phaseIndex]?.phase;
        handleProjectPhaseChange(newProjectPhase);
        console.log("projectPhaseCurrent", projectPhaseCurrent);
        const newRow = {
          serialNumber: newSerialNumber,
          projectPhase: currentProjectPhase[phaseIndex]?.phase,
          plannedDate: "",
          actualDate: "",
          completionPercentage: currentProjectPhase[phaseIndex]?.completion,
          daysInStage: "",
        };

        setRows1([...rows1, newRow]);
      } else {
        console.warn("Cannot add more rows than available project phases.");
      }
    } else {
      alert("Choose the category and add the project phases!");
    }
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
    // console.log("here we go", updatedRows)
    setRowFn(updatedRows);
  };

  const proCategoryProps = {
    options: proCategory,
    getOptionLabel: (option) => option.category,
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

  const currentProjectPhaseProps = {
    options: currentProjectPhaseMndF,
    getOptionLabel: (option) => option.phase,
  };
  const customerOrganisationProps = {
    options: customerLists,
    getOptionLabel: (option) => option.customer_organisation,
  };
  const customerPOCProps = {
    options: customerPOC,
    getOptionLabel: (option) => option.title,
  };
  const uploadTypeProps = {
    options: uploadType,
    getOptionLabel: (option) => option.type,
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
    if (
      updatedRows[index].actualDate &&
      new Date(date) > new Date(updatedRows[index].actualDate)
    ) {
      updatedRows[index].actualDate = "";
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
      <style>
        {`
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
              font-weight:100;
            }
            h5 {color:#606060!important;}
            `}
      </style>
      <Card variant="outlined">
        <CardContent>
          <div className="row mb-4">
            <h5>Add Project</h5>
            <hr />
            <div className="col-md-4 mt-3">
              <TextField
                label="Project No"
                className="w-100"
                id="outlined-size-small"
                size="small"
              />
            </div>

            <div className="col-md-4 mt-3">
              <TextField
                label="Project Title"
                className="w-100"
                id="outlined-size-small"
                size="small"
              />
            </div>

            <div className="col-md-4 mt-3">
              <Stack spacing={1}>
                <Autocomplete
                  {...proCategoryProps}
                  id="category-autocomplete"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Project Category"
                      className="w-100"
                      id="outlined-size-small"
                      size="small"
                    />
                  )}
                />
              </Stack>
            </div>

            <div className="col-md-4 mt-4">
              <Stack spacing={1}>
                <Autocomplete
                  {...salesPersonProps}
                  id=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sales Person"
                      id="outlined-size-small"
                      size="small"
                      className="w-100"
                    />
                  )}
                />
              </Stack>
            </div>

            <div className="col-md-4 mt-4">
              <Stack spacing={1}>
                <Autocomplete
                  {...sourceManagerProps}
                  id=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sourcing Manager"
                      className="w-100"
                      id="outlined-size-small"
                      size="small"
                    />
                  )}
                />
              </Stack>
            </div>

            <div className="col-md-4 mt-4">
              <Stack spacing={1}>
                <Autocomplete
                  {...assignProManagerProps}
                  id=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned Project Manager"
                      className="w-100"
                      id="outlined-size-small"
                      size="small"
                    />
                  )}
                />
              </Stack>
            </div>

            {/* <div className="col-md-4 mt-4">
              <Stack spacing={1}>
                <Autocomplete
                  {...currentProjectPhaseProps}
                  id=""
                  value={projectPhaseCurrent}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Current Project Phase"
                      className="w-100"
                      id="outlined-size-small"
                      size="small"
                    />
                  )}
                  disabled
                />
              </Stack>
            </div> */}

            <div className="col-md-4 mt-4">
              <TextField
                value={projectPhaseCurrent}
                label="Current Project Phase"
                className="w-100"
                id="outlined-size-small"
                size="small"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="col-md-4 mt-4">
              <TextField
                label="Project Phase - No Of Days"
                className="w-100"
                id="outlined-size-small"
                size="small"
              />
            </div>

            <div className="col-md-4 mt-4">
              <TextField
                label="Email of Project Manager"
                className="w-100"
                id="outlined-size-small"
                size="small"
              />
            </div>

            <div className="col-md-4 mt-4">
              <Stack spacing={1}>
                <Autocomplete
                  {...customerOrganisationProps}
                  id=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Organisation"
                      className="w-100"
                      id="outlined-size-small"
                      size="small"
                    />
                  )}
                />
              </Stack>
            </div>

            <div className="col-md-4 mt-4">
              <Stack spacing={1}>
                <Autocomplete
                  {...customerPOCProps}
                  id=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer POC"
                      id="outlined-size-small"
                      size="small"
                      className="w-100"
                    />
                  )}
                />
              </Stack>
            </div>

            <div className="col-md-4 mt-4">
              <TextField
                label="Customer Target Price"
                id="outlined-size-small"
                size="small"
                className="w-100"
              />
            </div>

            <div className="col-md-4 mt-4">
              <TextField
                label="Quaintity Floated"
                id="outlined-size-small"
                size="small"
                className="w-100"
              />
            </div>

            <div className="col-md-4 mt-4">
              <TextField
                label="Total Cost"
                id="outlined-size-small"
                size="small"
                className="w-100"
              />
            </div>
          </div>

          <hr />

          {/*------------------------------------*/}

          <div className="row">
            <h5> Project Tracking </h5>
            <div className="table-responsive px-1 mb-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Project Stage</th>
                    <th>Planned Date</th>
                    <th>Actual Date</th>
                    <th>% of Completion</th>
                    <th style={{ whiteSpace: "nowrap" }}>
                      No of Days in this Stage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows1.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "65px" }}>
                        <TextField
                          className="w-100"
                          size="small"
                          value={row.serialNumber}
                          disabled
                        />
                      </td>
                      <td style={{ width: "280px" }}>
                        <TextField
                          className="w-100"
                          size="small"
                          value={row.projectPhase}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "projectPhase",
                              e.target.value,
                              setRows1,
                              rows1
                            )
                          }
                          disabled
                        />
                      </td>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            className="w-100"
                            value={row.plannedDate || null}
                            onChange={(date) =>
                              handlePlannedDateChange(
                                index,
                                date,
                                rows1,
                                setRows1
                              )
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </td>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            className="w-100"
                            value={row.actualDate || null}
                            onChange={(date) =>
                              handleActualDateChange(
                                index,
                                date,
                                rows1,
                                setRows1
                              )
                            }
                            minDate={row.plannedDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </td>
                      <td>
                        <TextField
                          className="w-100"
                          size="small"
                          value={row.completionPercentage}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "completionPercentage",
                              e.target.value,
                              setRows1,
                              rows1
                            )
                          }
                          disabled
                        />
                      </td>
                      <td>
                        <TextField
                          className="w-100"
                          size="small"
                          value={row.daysInStage}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "daysInStage",
                              e.target.value,
                              setRows1,
                              rows1
                            )
                          }
                        />
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className="clsBtn"
                          onClick={() =>
                            handleRemoveRow(index, setRows1, rows1)
                          }
                          disabled={
                            rows1.length === 1 || index !== rows1.length - 1
                          }
                        >
                          <IoCloseCircleOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className="mx-2"
                variant="contained"
                color="primary"
                onClick={() => handleAddRow(setRows1, rows1)}
              >
                Add More
              </Button>
            </div>
          </div>

          <hr />
          {/*------------------------------------*/}

          <div className="row">
            <h5>Project Collateral</h5>
            <div className="table-responsive px-1 mb-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Note - About the attachment </th>
                    <th>Upload Type </th>
                    <th style={{ width: "120px" }}>File upload </th>
                    <th>Date </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows2.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "75px" }}>
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
                          label=""
                          className="w-100"
                          size="small"
                          value={row.noteAttach}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "noteAttach",
                              e.target.value,
                              setRows2,
                              rows2
                            )
                          }
                        />
                      </td>
                      <td style={{ width: "150px" }}>
                        <Stack spacing={1}>
                          <Autocomplete
                            {...uploadTypeProps}
                            id=""
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                className="w-100"
                                id="outlined-size-small"
                                size="small"
                              />
                            )}
                          />
                        </Stack>
                      </td>

                      <td style={{ width: "230px" }}>
                        <input
                          type="file"
                          accept="image/*" // Accept images only
                          onChange={(event) => handleFileChange(index, event)} // Handle file upload per row
                          style={{ display: "none" }} // Hide the native input element
                          id={`file-input-${index}`} // Use unique ID for each input
                        />
                        <TextField
                          style={{ width: "145px" }}
                          label={row.fileUpload ? row.fileUpload.name : ""}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <label htmlFor={`file-input-${index}`}>
                          <Button
                            className="px-1"
                            variant="contained"
                            component="span"
                            style={{ marginTop: "1.5px" }}
                          >
                            Select
                          </Button>
                        </label>
                      </td>

                      <td>
                        <td>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              className="w-100"
                              label=""
                              value=""
                              format="dd-MM-yyyy" // Custom date format
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </td>
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className="clsBtn"
                          onClick={() =>
                            handleRemoveRow(index, setRows2, rows2)
                          }
                          disabled={rows2.length === 1} // Prevent removing the last row
                        >
                          <IoCloseCircleOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className="mx-2"
                variant="contained"
                color="primary"
                onClick={() => handleAddRow(setRows2, rows2)}
              >
                Add More
              </Button>
            </div>
          </div>

          <hr />
          {/*------------------------------------*/}

          <div className="row">
            <h5>Project Execution Detail </h5>
            <div className="table-responsive px-1 mb-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Production Allocation </th>
                    <th>Link Part Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows3.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "75px" }}>
                        <TextField
                          label=""
                          className="w-100"
                          size="small"
                          value={row.serialNumber}
                          disabled // Serial Number is auto-generated and not editable
                        />
                      </td>

                      <td>
                        <Stack spacing={1}>
                          <Autocomplete
                            {...paMfPartnerProps}
                            id=""
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select"
                                className="w-100"
                                id="outlined-size-small"
                                size="small"
                              />
                            )}
                          />
                        </Stack>
                      </td>

                      <td style={{ width: "150px" }}>
                        <Stack spacing={1}>
                          <Autocomplete
                            {...linkPartProps}
                            id=""
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select"
                                className="w-100"
                                id="outlined-size-small"
                                size="small"
                              />
                            )}
                          />
                        </Stack>
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className="clsBtn"
                          onClick={() =>
                            handleRemoveRow(index, setRows3, rows3)
                          }
                          disabled={rows3.length === 1} // Prevent removing the last row
                        >
                          <IoCloseCircleOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className="mx-2"
                variant="contained"
                color="primary"
                onClick={() => handleAddRow(setRows3, rows3)}
              >
                Add More
              </Button>
            </div>
          </div>

          <hr />
          {/*------------------------------------*/}

          <div className="row">
            <h5>Delivery Schedule </h5>
            <div className="table-responsive px-1 mb-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Link Customer PO </th>
                    <th>Link Part Name</th>
                    <th>Quantity</th>
                    <th>Delivered</th>
                    <th>Planned date </th>
                    <th>Actual Date of Delivery </th>
                    <th>Customer Accepted Qty </th>
                  </tr>
                </thead>
                <tbody>
                  {rows4.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "75px" }}>
                        <TextField
                          label=""
                          className="w-100"
                          size="small"
                          value={row.serialNumber}
                          disabled // Serial Number is auto-generated and not editable
                        />
                      </td>
                      <td>
                        <Stack spacing={1}>
                          <Autocomplete
                            {...linkCusPoProps}
                            id=""
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                className="w-100"
                                id="outlined-size-small"
                                size="small"
                              />
                            )}
                          />
                        </Stack>
                      </td>
                      <td>
                        <Stack spacing={1}>
                          <Autocomplete
                            {...linkPartProps}
                            id=""
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                className="w-100"
                                id="outlined-size-small"
                                size="small"
                              />
                            )}
                          />
                        </Stack>
                      </td>
                      <td>
                        <TextField
                          label=""
                          className="w-100"
                          size="small"
                          value={row.noteAttach}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "quantity",
                              e.target.value,
                              setRows4,
                              rows4
                            )
                          }
                        />
                      </td>
                      <td style={{ width: "150px" }}>
                        <Stack spacing={1}>
                          <Autocomplete
                            {...DeliveredProps}
                            id=""
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                className="w-100"
                                id="outlined-size-small"
                                size="small"
                              />
                            )}
                          />
                        </Stack>
                      </td>

                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            style={{ width: "175px!important" }}
                            className="w-100"
                            label=""
                            value={row.plannedDate || null}
                            onChange={(date) =>
                              handlePlannedDateChange(
                                index,
                                date,
                                rows4,
                                setRows4
                              )
                            }
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
                            onChange={(date) =>
                              handleActualDateChange(
                                index,
                                date,
                                rows4,
                                setRows4
                              )
                            }
                            format="dd-MM-yyyy" // Custom date format
                            minDate={row.plannedDate} // Disable dates before the selected planned date
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </td>

                      <td>
                        <TextField
                          label=""
                          className="w-100"
                          size="small"
                          value={row.noteAttach}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "quantity",
                              e.target.value,
                              setRows4,
                              rows4
                            )
                          }
                        />
                      </td>

                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className="clsBtn"
                          onClick={() =>
                            handleRemoveRow(index, setRows4, rows4)
                          }
                          disabled={rows4.length === 1} // Prevent removing the last row
                        >
                          <IoCloseCircleOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className="mb-2 mx-2"
                variant="contained"
                color="primary"
                onClick={() => handleAddRow(setRows4, rows4)}
              >
                Add More
              </Button>
            </div>
            <div className="col-md-12 mt-4">
              <button className="btn btn-primary float-end" component="span">
                Submit
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default AddProject;

const proCategory = [
  { category: "PRECISION COMPONENT MACHINING-M&F" },
  { category: "MECHANICAL FABRICATION-FAB" },
  { category: "PCB FABRICATION-EMS" },
  { category: "PCB ASSEMBLY-EMS" },
  { category: "COMPONENT SOURCING-EMS" },
  { category: "TESTING & VALIDATION-EMS" },
  { category: "TURN KEY ENGINEERING SERVICES-M&F" },
  { category: "FASTENERS MACHINING-M&F" },
  { category: "CASTING-M&F" },
  { category: "SHEET METAL STAMPING-M&F" },
  { category: "HEAVY FABRICATION-FAB" },
  { category: "FORGING-M&F" },
  { category: "METAL INJECTION MOULDING-M&F" },
  { category: "PLASTIC INJECTION MOULDING-M&F" },
  { category: "ADDITIVE MANUFACTURING-M&F" },
  { category: "SHEET METAL FABRICATION-FAB" },
  { category: "RAW MATERIAL SOURCING-M&F" },
  { category: "WIRE HARNESS-EMS" },
];

const salesPerson = [
  { title: "Sales Person 1" },
  { title: "Sales Person 2" },
  { title: "Sales Person 3" },
  { title: "Sales Person 4" },
];

const sourceManager = [
  { title: "Source Manager 1" },
  { title: "Source Manager 2" },
  { title: "Source Manager 3" },
  { title: "Source Manager 4" },
];

const assignProManager = [
  { title: "Assigned Project Manager 1" },
  { title: "Assigned Project Manager 2" },
  { title: "Assigned Project Manager 3" },
  { title: "Assigned Project Manager 4" },
];

// const currentProjectPhase = [
//   { phase: "ENGINEERING DISCUSSIONS" },
//   { phase: "PRICE DISCOVERY" },
//   { phase: "REQUIREMENT DISCUSSION" },
//   { phase: "PARTNER ENGAGEMENT/RFQ RESPONSE" },
//   { phase: "SAMPLE MANUFACTURING" },
//   { phase: "SAMPLE SHIPMENT" },
//   { phase: "SAMPLE-QUALITY CONTROL" },
//   { phase: "AWAITING CUSTOMER PO" },
//   { phase: "CUSTOMER PO OBTAINED" },
//   { phase: "PARTNER PO PROCESSING" },
//   { phase: "PRODUCTION SET-UP" },
//   { phase: "IN PRODUCTION" },
//   { phase: "QUALITY CONTROL" },
//   { phase: "PACKAGING & SHIPMENT" },
//   { phase: "AWAITING PARTNER SHIPMENT" },
//   { phase: "RFQ LOGGED" },
//   { phase: "BOM Preparation from GA Assembly Drawing" },
//   { phase: "TECHNICAL QUERIES/ PREBID MEETINGS" },
//   { phase: "SITE VISIT" },
//   { phase: "MAN & MACHINE CALCULATION BASED ON PROJECT SCHEDULING" },
//   { phase: "PREPARATION OF QUOTATION" },
//   { phase: "APPROVAL FROM FINANCE & MANAGEMENT" },
//   { phase: "OFFER SUBMISSION" },
//   { phase: "ORDER EXECUTION" },
//   { phase: "DELIVERED" },
//   { phase: "ON HOLD" },
//   { phase: "CANCELLED" },
// ];

const customerOrganisation = [
  { title: "Oraganisation 1" },
  { title: "Oraganisation 2" },
  { title: "Oraganisation 3" },
  { title: "Oraganisation 4" },
];

const customerPOC = [
  { title: "POC 1" },
  { title: "POC 2" },
  { title: "POC 3" },
  { title: "POC 4" },
];

const uploadType = [
  { type: "Quality Document" },
  { type: "Sample Pictures" },
  { type: "Material Certificate" },
  { type: "Transportation Document" },
  { type: "Inspection Document" },
  { type: "Proposal (MachineMaze)" },
  { type: "3D Model" },
  { type: "Draft & Drawings" },
  { type: "Calculation Document" },
  { type: "Specification Document" },
];

const paMfPartner = [
  { title: "MF Partner 1" },
  { title: "MF Partner 2" },
  { title: "MF Partner 3" },
  { title: "MF Partner 4" },
];

const paEmsPartner = [
  { title: "EMS Partner 1" },
  { title: "EMS Partner 2" },
  { title: "EMS Partner 3" },
  { title: "EMS Partner 4" },
];

const paFabPartner = [
  { title: "Fab Partner 1" },
  { title: "Fab Partner 2" },
  { title: "Fab Partner 3" },
  { title: "Fab Partner 4" },
];

const linkPart = [
  { title: "Link Part 1" },
  { title: "Link Part 2" },
  { title: "Link Part 3" },
  { title: "Link Part 4" },
];

const linkCusPo = [
  { title: "Link Customer PO 1" },
  { title: "Link Customer PO 2" },
  { title: "Link Customer PO 3" },
  { title: "Link Customer PO 4" },
];

const Delivered = [{ title: "Yes" }, { title: "No" }];
