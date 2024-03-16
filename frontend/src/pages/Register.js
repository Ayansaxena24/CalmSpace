import * as React from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSignUpAction } from "../Redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ReactFlipCard from 'reactjs-flip-card'

//Registration input format
const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .min(3, "Last Name should be of minimum 3 characters length")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  age: yup
    .number("Enter your age")
    .required("Age is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  role: yup
    .string("Enter your role")
    .required("Role is required"),
  gender: yup
    .string("Enter your gender")
    .required("Gender is required"),
  marksTenth: yup     
    .string("Enter your 10th marks"),
  marksTwelth: yup
    .string("Enter your 12th marks"),
  highestEducation: yup
    .string("Enter your highest education"),
  qualification: yup
    .string("Enter your qualification"),
  cgpaUG: yup
    .number("Enter your UG CGPA"),
  activeBacklogs: yup
    .boolean("Do you have any active Backlogs?"),  
  workExperience: yup
    .string("Enter your work experience"),  
  position: yup
    .string("Enter your position"),
  yearsOfExperience: yup
    .number("Enter your years of experience"),
  presentEmployement: yup
    .string("Enter your present Company's Name"),
  noticePeriod: yup
    .number("Enter your notice period (in days"),
    skills: yup
    .lazy(val => (Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()))
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.mode);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const steps = ["Personal Information", "Education", "Experience"];
  console.log(steps.length, "asasasasasasasasas");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(userSignUpAction(values));
      actions.resetForm();
      navigate("/login");
    },
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Navbar />
      <Box
              sx={{
                height: "auto",
                minHeight: "86vh",
                // display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: mode === "dark" ? "#121212" : "whitesmoke",
              }}
            >
        <Stepper activeStep={activeStep} className="pt-10 mx-40">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

          <React.Fragment>
            <Box
              sx={{
                height: "auto",
                minHeight: "86vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: mode === "dark" ? "#121212" : "primary.white",
              }}
            >
              <Box
                onSubmit={formik.handleSubmit}
                component="form"
                className="form_style border-style w-96 flex flex-col"
              >
                {activeStep === 0 ? ( //Personal Details
                    <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                      <LockOpenIcon />
                    </Avatar>
                    <div className="flex w-full space-x-4">
                      <TextField
                        sx={{
                          mb: 3,
                          "& .MuiInputBase-root": {
                            color: "text.secondary",
                          },
                          fieldset: { borderColor: "rgb(231, 235, 240)" },
                        }}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                      <TextField
                        sx={{
                          mb: 3,
                          "& .MuiInputBase-root": {
                            color: "text.secondary",
                          },
                          fieldset: { borderColor: "rgb(231, 235, 240)" },
                        }}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                      />
                    </div>
                    <div className="flex w-full space-x-4">
                      <TextField
                        sx={{
                          mb: 3,
                          "& .MuiInputBase-root": {
                            color: "text.secondary",
                          },
                          fieldset: { borderColor: "rgb(231, 235, 240)" },
                        }}
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <TextField
                        sx={{
                          mb: 3,
                          "& .MuiInputBase-root": {
                            color: "text.secondary",
                          },
                          fieldset: { borderColor: "rgb(231, 235, 240)" },
                        }}
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                      />
                    </div>
                    <div className="flex w-full space-x-2">
                      <FormControl fullWidth>
                        <InputLabel id="gender2">Gender</InputLabel>
                        <Select
                          sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                              color: "text.secondary",
                            },
                            fieldset: { borderColor: "rgb(231, 235, 240)" },
                          }}
                          fullWidth
                          id="gender"
                          labelId="gender2"
                          name="gender"
                          label="Gender"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="Gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.gender && Boolean(formik.errors.gender)
                          }
                          helperText={
                            formik.touched.gender && formik.errors.gender
                          }
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        sx={{
                          mb: 3,
                          "& .MuiInputBase-root": {
                            color: "text.secondary",
                          },
                          fieldset: { borderColor: "rgb(231, 235, 240)" },
                        }}
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </div>
                    <FormControl fullWidth>
                      <InputLabel id="role2">Role</InputLabel>
                      <Select
                        sx={{
                          mb: 3,
                          "& .MuiInputBase-root": {
                            color: "text.secondary",
                          },
                          fieldset: { borderColor: "rgb(231, 235, 240)" },
                        }}
                        fullWidth
                        id="role"
                        labelId="role2"
                        name="role"
                        label="role"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role}
                      >
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={0}>Applicant</MenuItem>
                        <MenuItem value={2}>Creator</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <Button fullWidth variant="contained" type="submit">
                      Register
                    </Button> */}
                  </Box>
                ) : activeStep === 1 ? ( //Education
                    <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                    <LockOpenIcon />
                  </Avatar>
                  <div className="flex w-full space-x-4">
                  <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="highestEducation"
                      label="highestEducation"
                      name="highestEducation"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Highest Education (Institution Name)"
                      value={formik.values.highestEducation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.highestEducation &&
                        Boolean(formik.errors.highestEducation)
                      }
                      helperText={
                        formik.touched.highestEducation && formik.errors.highestEducation
                      }
                    />
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="qualification"
                      label="qualification"
                      name="qualification"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Qualification (B.Tech, M.Tech, etc)"
                      value={formik.values.qualification}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.qualification &&
                        Boolean(formik.errors.qualification)
                      }
                      helperText={
                        formik.touched.qualification && formik.errors.qualification
                      }
                    />
                  </div>
                  <div className="flex w-full space-x-4">
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="marksTenth"
                      label="marksTenth"
                      name="marksTenth"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="10th Percentage / CGPA"
                      value={formik.values.marksTenth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.marksTenth && Boolean(formik.errors.marksTenth)
                      }
                      helperText={formik.touched.marksTenth && formik.errors.marksTenth}
                    />
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="marksTwelth"
                      label="marksTwelth"
                      name="marksTwelth"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="12th percentage"
                      value={formik.values.marksTwelth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.marksTwelth && Boolean(formik.errors.marksTwelth)}
                      helperText={formik.touched.marksTwelth && formik.errors.marksTwelth}
                    />
                  </div>
                  <div className="flex w-full space-x-2">
                    
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="cgpaUG"
                      name="cgpaUG"
                      label="UG CGPA"
                      type="cgpaUG"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="UG CGPA"
                      value={formik.values.cgpaUG}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.cgpaUG &&
                        Boolean(formik.errors.cgpaUG)
                      }
                      helperText={
                        formik.touched.cgpaUG && formik.errors.cgpaUG
                      }
                    />
                  </div>
                  <div className="flex w-full space-x-4">
                  <FormControl fullWidth>
                      <InputLabel id="activeBacklogs">Active Backlogs?</InputLabel>
                    <Select
                    sx={{
                      mb: 3,
                      "& .MuiInputBase-root": {
                        color: "text.secondary",
                      },
                      fieldset: { borderColor: "rgb(231, 235, 240)" },
                    }}
                    fullWidth
                    id="activeBacklogs"
                    name="activeBacklogs"
                    label="Active Backlogs?"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Active Backlogs? (Yes/No)"
                    value={formik.values.activeBacklogs}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.activeBacklogs &&
                      Boolean(formik.errors.activeBacklogs)
                    }
                    helperText={
                      formik.touched.activeBacklogs && formik.errors.activeBacklogs
                    }
                  >
                    <MenuItem value={"true"}>Yes</MenuItem>
                    <MenuItem value={"false"}>No</MenuItem>
                    </Select>
                  </FormControl>
                  </div>
                    </Box>
                ) : (                   //Experience
                    <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                    <LockOpenIcon />
                  </Avatar>
                  <div className="flex w-full space-x-4">
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="workExperience"
                      label="workExprience"
                      name="workExperience"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Mention your previous Company Name (if you have any Experience)"
                      value={formik.values.workExperience}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.workExperience &&
                        Boolean(formik.errors.workExperience)
                      }
                      helperText={
                        formik.touched.workExperience && formik.errors.workExperience
                      }
                    />
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="position"
                      label="Role"
                      name="position"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Role in the Company"
                      value={formik.values.position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.position &&
                        Boolean(formik.errors.position)
                      }
                      helperText={
                        formik.touched.position && formik.errors.position
                      }
                    />
                  </div>
                  <div className="flex w-full space-x-4">
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="yearsOfExperience"
                      label="Years of Experience"
                      name="yearsOfExperience"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Years of Experience"
                      value={formik.values.yearsOfExperience}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)
                      }
                      helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
                    />
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="presentEmployement"
                      label="Present Employment"
                      name="presentEmployement"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Present Employement (if any)"
                      value={formik.values.presentEmployement}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.presentEmployement && Boolean(formik.errors.presentEmployement)}
                      helperText={formik.touched.presentEmployement && formik.errors.presentEmployement}
                    />
                  </div>
                  <div className="flex w-full space-x-2">
                    <TextField
                      sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                          color: "text.secondary",
                        },
                        fieldset: { borderColor: "rgb(231, 235, 240)" },
                      }}
                      fullWidth
                      id="noticePeriod"
                      name="noticePeriod"
                      label="Notice Period (In Days)"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Notice Period"
                      value={formik.values.noticePeriod}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.noticePeriod &&
                        Boolean(formik.errors.noticePeriod)
                      }
                      helperText={
                        formik.touched.noticePeriod && formik.errors.noticePeriod
                      }
                    />
                  </div>
                  <div className="flex w-full space-x-2">
    <Autocomplete
        multiple
        fullWidth
        id="skills"
        name="skills"
        options={["ReactJS", "HTML5", "CSS", "Redux", "TailwindCSS", "Javascript", "Typescript", "NodeJS", "ExpressJS", "MongoDB", "Go", "Python", "AI/ML"]} // Add your options here
        freeSolo
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                />
            ))
        }
        renderInput={(params) => (
            <TextField
                {...params}
                sx={{
                    mb: 3,
                    "& .MuiInputBase-root": {
                        color: "text.secondary",
                    },
                    fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                label="Skills"
                placeholder="Skills"
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        )}
        value={formik.values.skills}
        onChange={(event, newValue) => {
            formik.setFieldValue("skills", newValue);
        }}
    />
    <TextField
        sx={{
            mb: 3,
            "& .MuiInputBase-root": {
                color: "text.secondary",
            },
            fieldset: { borderColor: "rgb(231, 235, 240)" },
        }}
        fullWidth
        id="resumeLink"
        name="resumeLink"
        label="Resume Link"
        InputLabelProps={{
            shrink: true,
        }}
        placeholder="resumeLink"
        value={formik.values.resumeLink}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.resumeLink && Boolean(formik.errors.resumeLink)}
        helperText={formik.touched.resumeLink && formik.errors.resumeLink}
    />
</div>


                  <Button fullWidth variant="contained" type="submit">
                    Register
                  </Button>
                </Box>
                )}
                
                <div className="w-full flex justify-center items-center">
                <Box sx={{ display: "flex", flexDirection: "row", pt: 0 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                <Button onClick={handleNext} disabled={activeStep === 2}>
                  Next
                </Button>
              </Box>
              </div>
              </Box>
            </Box>
           
          </React.Fragment>
      </Box>
      <Footer />
    </>
  );

  // return (
  //     <>
  //         <Navbar />
  //         <Box sx={{ height: 'auto', minHeight: '86vh', display: "flex", alignItems: "center", justifyContent: "center", bgcolor: mode === "dark" ? "#121212" : "primary.white" }}>

  //             <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style w-96' >
  //                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
  //                     <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
  //                         <LockOpenIcon />
  //                     </Avatar>
  //                     <div className="flex w-full space-x-4">
  //                     <TextField
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary',
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="firstName"
  //                         label="First Name"
  //                         name='firstName'
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}

  //                         placeholder="First Name"
  //                         value={formik.values.firstName}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.firstName && Boolean(formik.errors.firstName)}
  //                         helperText={formik.touched.firstName && formik.errors.firstName}
  //                     />
  //                     <TextField
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary',
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="lastName"
  //                         label="Last Name"
  //                         name='lastName'
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}

  //                         placeholder="Last Name"
  //                         value={formik.values.lastName}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.lastName && Boolean(formik.errors.lastName)}
  //                         helperText={formik.touched.lastName && formik.errors.lastName}
  //                     />
  //                     </div>
  //                     <div className="flex w-full space-x-4">
  //                     <TextField
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary',
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="email"
  //                         label="E-mail"
  //                         name='email'
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}

  //                         placeholder="E-mail"
  //                         value={formik.values.email}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.email && Boolean(formik.errors.email)}
  //                         helperText={formik.touched.email && formik.errors.email}
  //                     />
  //                     <TextField
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary',
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="age"
  //                         label="Age"
  //                         name='age'
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}

  //                         placeholder="Age"
  //                         value={formik.values.age}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.age && Boolean(formik.errors.age)}
  //                         helperText={formik.touched.age && formik.errors.age}
  //                     />
  //                     </div>
  //                     <div className="flex w-full space-x-2">
  //                     <FormControl fullWidth>
  //                     <InputLabel id="gender2">Gender</InputLabel>
  //                     <Select
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary'
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="gender"
  //                         labelId='gender2'
  //                         name="gender"
  //                         label="Gender"
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}
  //                         placeholder="Gender"
  //                         value={formik.values.gender}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.gender && Boolean(formik.errors.gender)}
  //                         helperText={formik.touched.gender && formik.errors.gender}
  //                     >
  //                         <MenuItem value={"Male"}>Male</MenuItem>
  //                         <MenuItem value={"Female"}>Female</MenuItem>
  //                         <MenuItem value={"Others"}>Others</MenuItem>
  //                         </Select>
  //                         </FormControl>
  //                     <TextField
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary'
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="password"
  //                         name="password"
  //                         label="Password"
  //                         type="password"
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}
  //                         placeholder="Password"
  //                         value={formik.values.password}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.password && Boolean(formik.errors.password)}
  //                         helperText={formik.touched.password && formik.errors.password}
  //                     />
  //                     </div>
  //                     <FormControl fullWidth>
  //                     <InputLabel id="role2">Role</InputLabel>
  //                     <Select
  //                         sx={{
  //                             mb: 3,
  //                             "& .MuiInputBase-root": {
  //                                 color: 'text.secondary'
  //                             },
  //                             fieldset: { borderColor: "rgb(231, 235, 240)" }
  //                         }}
  //                         fullWidth
  //                         id="role"
  //                         labelId='role2'
  //                         name="role"
  //                         label="role"
  //                         InputLabelProps={{
  //                             shrink: true,
  //                         }}
  //                         placeholder="role"
  //                         value={formik.values.role}
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         error={formik.touched.role && Boolean(formik.errors.role)}
  //                         helperText={formik.touched.role && formik.errors.role}
  //                     >
  //                         <MenuItem value={1}>Admin</MenuItem>
  //                         <MenuItem value={0}>Applicant</MenuItem>
  //                         <MenuItem value={2}>Creator</MenuItem>
  //                         </Select>
  //                         </FormControl>
  //                     <Button fullWidth variant="contained" type='submit' >Register</Button>
  //                 </Box>
  //             </Box>
  //         </Box>

  //     </>
  // )
};

export default Register;
