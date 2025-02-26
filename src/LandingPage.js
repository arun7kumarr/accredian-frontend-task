import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ReferralForm = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      referrer: "",
      referrerEmail: "",
      referee: "",
      refereeEmail: "",
      message: ""
    },
    validationSchema: Yup.object({
      referrer: Yup.string().required("Required"),
      referrerEmail: Yup.string().email("Invalid email").required("Required"),
      referee: Yup.string().required("Required"),
      refereeEmail: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("https://accredian-backend-task-s4kp.onrender.com/api/referrals", values);
        alert("Referral submitted successfully!");
        resetForm();
        handleClose();
      } catch (error) {
        alert("Error submitting referral");
      }
    }
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Refer a Friend</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4 p-4">
          <TextField label="Your Name" {...formik.getFieldProps("referrer")} error={formik.touched.referrer && !!formik.errors.referrer} helperText={formik.touched.referrer && formik.errors.referrer} />
          <TextField label="Your Email" {...formik.getFieldProps("referrerEmail")} error={formik.touched.referrerEmail && !!formik.errors.referrerEmail} helperText={formik.touched.referrerEmail && formik.errors.referrerEmail} />
          <TextField label="Friend's Name" {...formik.getFieldProps("referee")} error={formik.touched.referee && !!formik.errors.referee} helperText={formik.touched.referee && formik.errors.referee} />
          <TextField label="Friend's Email" {...formik.getFieldProps("refereeEmail")} error={formik.touched.refereeEmail && !!formik.errors.refereeEmail} helperText={formik.touched.refereeEmail && formik.errors.refereeEmail} />
          <TextField label="Message (Optional)" {...formik.getFieldProps("message")} multiline rows={3} />
          <Button type="submit" variant="contained" color="primary">Submit Referral</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Refer & Earn</h1>
      <p className="text-lg mt-2">Refer a friend and earn rewards!</p>
      <Button variant="contained" color="secondary" className="mt-4" onClick={() => setOpen(true)}>Refer Now</Button>
      <ReferralForm open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default LandingPage;
