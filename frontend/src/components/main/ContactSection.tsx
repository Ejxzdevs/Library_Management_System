import { Box, Typography, Button, TextField } from '@mui/material';
import LibraryImage from '../../assets/Library.jpg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, InquiryFormData } from '../../utils/formSchema'
import { postInquiry } from '../../services/contactApi';



const ContactSection = () => {
  // Set up the form with react-hook-form and integrate zodResolver for validation
  const { register, handleSubmit, formState: { errors }, } = useForm<InquiryFormData>({ resolver: zodResolver(inquirySchema),});
  // Handle form submission
  const onSubmit: SubmitHandler<InquiryFormData> = async (data) => {
    try {
      console.log("Form submitted with data: ", data);

      // Call the API service to submit the inquiry
      const response = await postInquiry({
        inquiry_name: data.name,
        inquiry_email: data.email,
        inquiry_message: data.message,
      });

      console.log('Inquiry added successfully:', response);
      // You can show a success message or reset the form here

    } catch (error) {
      console.error('Error submitting inquiry:', error);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <Box className="h-auto flex flex-col">
      <Box
        className="relative bg-cover bg-center py-12 px-20"
        sx={{
          backgroundImage: `url(${LibraryImage})`,
        }}
      >
        {/* FOR OVERLAY */}
        <Box className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"></Box>
        <Box className="relative z-10 text-white h-auto max-w-[800px]">
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            }}
          >
            Contact Us
          </Typography>
        </Box>
      </Box>

      <Box className="h-auto flex justify-center items-center py-10 sm:h-auto">
        {/* Form */}
        <form
          className="flex flex-col gap-5 border border-gray-500 h-auto w-[500px] rounded-md p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Input */}
          <TextField
            id="name"
            label="Name"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          {/* Email Input */}
          <TextField
            id="email"
            label="Email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {/* Message Input */}
          <TextField
            id="message"
            label="Message"
            multiline
            rows={4}
            fullWidth
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactSection;
