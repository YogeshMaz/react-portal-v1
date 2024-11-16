import { useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fakeData } from "./makeData";
import useFetchReportData from "../../components/hooks/fetchReportData";

// Main Table Component
const Example = ({ setMenudata }) => {
  const { data, error, noData } = useFetchReportData(
    "http://localhost:5000/api/test/project_tracking_test_report"
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row data for editing
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  // State for managing modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Function to open the modal and set the selected row data
  const handleOpenModal = (row) => {
    setSelectedRowData(row); // Set the row data for the modal
    setOpenModal(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedRowData(null); // Clear the selected row data
  };

  const columns = useMemo(
    () => [
      { accessorKey: "ID", header: "Id", enableEditing: false, size: 80 },
      { accessorKey: "Project_Category", header: "Project Category" },
      { accessorKey: "Project_Title", header: "Project Title" },
      { accessorKey: "Project_Number", header: "Project Number" },
      {
        header: "Project Collateral",
        accessorFn: (row) =>
          row?.Project_Collateral[0]?.zc_display_value || "-",
        size: 150,
      },
      // {
      //   header: "Delivery Schedule",
      //   accessorFn: (row) => row.Delivery_Schedule[0]?.Delivered || "-",
      //   Cell: ({ row }) => (
      //     <>
      //       <Button
      //         variant="outlined"
      //         onClick={() => handleOpenModal(row.original)}
      //       >
      //         View Details
      //       </Button>

      //       {/* Modal */}
      //       <Dialog
      //         open={openModal}
      //         onClose={handleCloseModal}
      //         maxWidth="lg" // Increased dialog box size
      //         fullWidth
      //         PaperProps={{
      //           style: {
      //             minHeight: "80vh", // Increase height of the dialog
      //             maxHeight: "90vh", // Prevent it from being too large
      //           },
      //         }}
      //       >
      //         <DialogTitle>Delivery Schedule Details</DialogTitle>
      //         <DialogContent>
      //           <Box>
      //             {/* Table-like header */}
      //             <Grid
      //               container
      //               spacing={2}
      //               sx={{ backgroundColor: "#f0f0f0", padding: 1 }}
      //             >
      //               <Grid item xs={1}>
      //                 <strong>S.No</strong>
      //               </Grid>
      //               <Grid item xs={2}>
      //                 <strong>Delivered</strong>
      //               </Grid>
      //               <Grid item xs={2}>
      //                 <strong>Planned Date</strong>
      //               </Grid>
      //               <Grid item xs={2}>
      //                 <strong>PO Number</strong>
      //               </Grid>
      //               <Grid item xs={2}>
      //                 <strong>Part Name</strong>
      //               </Grid>
      //               <Grid item xs={2}>
      //                 <strong>Quantity</strong>
      //               </Grid>
      //             </Grid>

      //             {/* Delivery Schedule rows */}
      //             {selectedRowData?.Delivery_Schedule?.map(
      //               (schedule, index) => (
      //                 <Grid
      //                   container
      //                   spacing={2}
      //                   key={index}
      //                   sx={{ padding: 1, borderBottom: "1px solid #ccc" }}
      //                 >
      //                   <Grid item xs={1}>
      //                     {index + 1}
      //                   </Grid>
      //                   <Grid item xs={2}>
      //                     {schedule.Delivered || "-"}
      //                   </Grid>
      //                   <Grid item xs={2}>
      //                     {schedule.Planned_date || "-"}
      //                   </Grid>
      //                   <Grid item xs={2}>
      //                     {schedule.Link_Customer_PO?.PO_Number || "-"}
      //                   </Grid>
      //                   <Grid item xs={2}>
      //                     {schedule.Link_Part_Name?.Part_Name || "-"}
      //                   </Grid>
      //                   <Grid item xs={2}>
      //                     {schedule.Quantity || "-"}
      //                   </Grid>
      //                 </Grid>
      //               )
      //             )}
      //           </Box>
      //         </DialogContent>
      //         <DialogActions>
      //           <Button onClick={handleCloseModal} color="primary">
      //             Close
      //           </Button>
      //         </DialogActions>
      //       </Dialog>
      //     </>
      //   ),
      // },
      {
        header: "Delivery Schedule",
        accessorFn: (row) => row.Delivery_Schedule[0]?.Delivered || "-",
        Cell: ({ row }) => (
          <>
            <Button variant="outlined" onClick={() => handleOpenModal(row.original)}>
              View Details
            </Button>

            {/* Modal */}
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              maxWidth="lg" // Increased dialog box size
              fullWidth
              PaperProps={{
                style: {
                  minHeight: '80vh', // Increase height of the dialog
                  maxHeight: '90vh', // Prevent it from being too large
                },
              }}
            >
              <DialogTitle>Delivery Schedule Details</DialogTitle>
              <DialogContent>
                {/* Ensure selectedRowData?.Delivery_Schedule is an array */}
                {selectedRowData?.Delivery_Schedule?.length > 0 ? (
                  <MaterialReactTable
                    columns={[
                      {
                        accessorKey: 'Delivered', // Access the "Delivered" property
                        header: 'Delivered',
                      },
                      {
                        accessorKey: 'Planned_date', // Access the "Planned_date" property
                        header: 'Planned Date',
                      },
                      {
                        accessorKey: 'Link_Customer_PO.PO_Number', // Access the "PO Number" property
                        header: 'PO Number',
                      },
                      {
                        accessorKey: 'Link_Part_Name.Part_Name', // Access the "Part Name" property
                        header: 'Part Name',
                      },
                      {
                        accessorKey: 'Quantity', // Access the "Quantity" property
                        header: 'Quantity',
                      },
                    ]}
                    data={selectedRowData.Delivery_Schedule} // Set table data to Delivery_Schedule
                    enablePagination // Enables pagination
                    enableSorting // Enables sorting
                    enableGlobalFilter // Enables search
                    enableRowNumbers // Adds serial numbers to rows
                    initialState={{ pagination: { pageSize: 5 } }} // Initial page size
                    muiTablePaperProps={{
                      elevation: 0,
                      sx: {
                        borderRadius: '10px',
                      },
                    }}
                  />
                ) : (
                  <p>No data to display</p> // Fallback message if no data
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ),
      },
      {
        header: "Project Phase No of Days",
        accessorKey: "Project_Phase_No_of_Days",
      },
    ],
    [openModal, selectedRowData]
  );

  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser(); // Mutation to update user

  // Open menu on row click
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row.original);
  };

  // Handle row deletion
  const handleDelete = async () => {
    if (selectedRow.ID) {
      await deleteUser(selectedRow.ID);
      setAnchorEl(null);
    }
  };

  // Open the dialog to edit row
  const handleEdit = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  // Submit edited row to the API
  const handleSubmitEdit = async () => {
    if (selectedRow.ID) {
      await updateUser(selectedRow); // Submit the updated row
      console.log(selectedRow);
      setOpenDialog(false); // Close the dialog after submission
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested input changes for arrays/objects
  const handleNestedInputChange = (parent, index, field, e) => {
    const { value } = e.target;

    setSelectedRow((prev) => {
      const updatedNestedData = [...prev[parent]];
      // Split the field path for nested properties
      const fields = field.split(".");

      // Navigate through nested properties
      fields.reduce((acc, currField, idx) => {
        if (idx === fields.length - 1) {
          // Set the value on the last field
          acc[currField] = value;
        } else {
          // Create nested objects if they don't exist
          acc[currField] = acc[currField] || {};
        }
        return acc[currField];
      }, updatedNestedData[index]);

      return { ...prev, [parent]: updatedNestedData };
    });
  };

  const table = useMaterialReactTable({
    columns,
    data: data,
    enableEditing: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={(event) => handleClick(event, row)}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
    ),
  });

  return (
    <>
      <h5>Project Tracking Test Report</h5>
      <MaterialReactTable table={table} />

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box sx={{ marginTop: "5px" }}>
              <Grid container spacing={2}>
                {/* Project Details Section */}
                <Typography my={2}>Project Details</Typography>
                <Box mt={2} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Project Number"
                      name="Project_Number"
                      value={selectedRow.Project_Number || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Project Category"
                      name="Project_Category"
                      value={selectedRow.Project_Category || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Project Title"
                      name="Project_Title"
                      value={selectedRow.Project_Title || ""}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                {/* Delivery Schedule Section */}
                <Typography my={2}>Delivery Schedule</Typography>
                <Box mt={2} />
                <Grid container spacing={2}>
                  {selectedRow.Delivery_Schedule?.map((scheduleItem, index) => (
                    <Grid container spacing={2} my={1} ml={2} key={index}>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Delivered"
                          name={`Delivered-${index}`} // Unique name for each field
                          value={scheduleItem.Delivered || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "Delivery_Schedule",
                              index,
                              "Delivered",
                              e
                            )
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="PO Number"
                          name={`PO_Number-${index}`} // Unique name for each field
                          value={scheduleItem.Link_Customer_PO?.PO_Number || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "Delivery_Schedule",
                              index,
                              "Link_Customer_PO.PO_Number",
                              e
                            )
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Planned Date"
                          name={`Planned_date-${index}`} // Unique name for each field
                          type="date"
                          value={scheduleItem.Planned_date || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "Delivery_Schedule",
                              index,
                              "Planned_date",
                              e
                            )
                          }
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Quantity"
                          name={`Quantity-${index}`} // Unique name for each field
                          value={scheduleItem.Quantity || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "Delivery_Schedule",
                              index,
                              "Quantity",
                              e
                            )
                          }
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// DELETE hook
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await fetch(`/api/delete/${userId}`, { method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}

// UPDATE hook (edit row)
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/test/project_tracking_test_report_edit?ID=${userData.ID}`,
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
          }
        );

        // Log full response to inspect
        console.log("Full response:", response);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to update user:", response.status, errorText);
          throw new Error(
            `Failed to update user: ${response.status} ${errorText}`
          );
        }

        return await response.json();
      } catch (error) {
        console.error("Error during mutation:", error);
        throw error; // rethrow so that onError can catch it
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Invalidate user list query
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
}

const queryClient = new QueryClient();

const ExampleTableEditWithModel = ({ setMenudata }) => (
  <QueryClientProvider client={queryClient}>
    <Example setMenudata={setMenudata} />
  </QueryClientProvider>
);

export default ExampleTableEditWithModel;
