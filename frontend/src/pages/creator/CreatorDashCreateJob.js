import { Box, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { jobTypeLoadAction } from "../../Redux/actions/jobTypeAction";
import { registerAjobAction } from "../../Redux/actions/jobAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  company: yup
    .string("Enter company name")
    .required("Company name is required"),
  title: yup.string("Enter a job title").required("title is required"),
  description: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 6 characters length")
    .required("Description is required"),
  salary: yup
    .number("Enter a salary")
    .required("Salary is required"),
  // experience: yup
  //   .number("Enter expereince(years)")
  //   .required("Experience is required"),
  location: yup
    .string("Enter a location")
    .required("Location is required"),
  available: yup
    .boolean("Enter a availability")
    .required("Availability is required"),
  availableTill: yup
    .date()
    .min(new Date(), 'Selected date must be today or later')
    .required('Selected date is required'),
  jobType: yup
    .string("Enter a Category")
    .required("Category is required"),
});

const CreatorDashCreateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { singleJob, loading }  = useSelector(state => state.singleJob)

  //job type
  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { userInfo: user } = useSelector((state) => state.userProfile);
  const { mode } = useSelector((state) => state.mode);
  // console.log("User ID ==============>>>>>>>>>>>>>>>>>>>>", user._id);

  // const createAJob = () => {
  //     dispatch(creatorJobAction({
  //         title: singleJob && singleJob.title,
  //         description: singleJob && singleJob.description,
  //         salary: singleJob && singleJob.salary,
  //         location: singleJob && singleJob.location
  //     }))
  // }

  const formik = useFormik({
    initialValues: {
      company: "",
      title: "",
      description: "",
      salary: "",
      location: "",
      available: "",
      availableTill: "",
      jobType: "",
      user: user && user._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
        console.log("Submitting form:", values); // Check if form values are correct
      dispatch(registerAjobAction(values));
      actions.resetForm();
      navigate('/admin/category')
    },
  });

  return (
    <>
      <Box
        // sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}
        className="h-[100%] flex items-center justify-center pt-2"
      >
        <Box
        onSubmit={formik.handleSubmit}
        component="form"
          className={`relative flex p-[24px] border-[1px] w-[55%] rounded-2xl ${
            mode === "dark"
              ? "border-gray-600 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
              : "border-black bg-white"
          }`}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            
            className='form_style border-style'
          >
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Register a Job
            </Typography>

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="company"
              label="company"
              name="company"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="salary"
              name="salary"
              label="Salary"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="location"
              name="location"
              label="Location"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <TextField
              sx={{ mb: 3, text: "black" }}
              fullWidth
              className="px-2 my-2 text-black"
              variant="outlined"
              name="available"
              id="available"
              select
              label="Available"
              value={formik.values.available}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.available && Boolean(formik.errors.available)}
              helperText={formik.touched.available && formik.errors.available}
            >
              <MenuItem key={""} value={""}></MenuItem>
                  <MenuItem key={true} value={true}>true</MenuItem>
                  <MenuItem key={false} value={false}>false</MenuItem>
            </TextField>

            <TextField
              sx={{ mb: 3, text: "black" }}
              fullWidth
              className="px-2 my-2 text-black"
              variant="outlined"
              name="availableTill"
              id="availableTill"
              type="date"
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
              InputLabelProps={{
                shrink: true,
              }}
              label="Available Till"
              value={formik.values.availableTill}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.availableTill && Boolean(formik.errors.availableTill)}
              helperText={formik.touched.availableTill && formik.errors.availableTill}
            >
            </TextField>

            <TextField
              sx={{ mb: 3, text: "black" }}
              fullWidth
              className="px-2 my-2 text-black"
              variant="outlined"
              name="jobType"
              id="jobType"
              select
              label="Category"
              value={formik.values.jobType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobType && Boolean(formik.errors.jobType)}
              helperText={formik.touched.jobType && formik.errors.jobType}
            >
              <MenuItem key={""} value={""}></MenuItem>

              {jobType &&
                jobType.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.jobTypeName}
                  </MenuItem>
                ))}
            </TextField>

            <Button fullWidth variant="contained" type="submit">
              Create job
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreatorDashCreateJob;
