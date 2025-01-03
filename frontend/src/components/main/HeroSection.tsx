import { Box, Typography } from "@mui/material";
import LibraryImage from '../../assets/Library.jpg';

const HeroSection = () => {
  return (
    <Box className="
    relative h-auto bg-cover bg-center py-32 px-5 
    sm:h-auto 
    md:h-auto
    md:flex
    md:items-center
    md:justify-center
    lg:h-[100vh]
    lg:flex
    lg:items-center
    lg:justify-center
    "
      sx={{
        backgroundImage: `url(${LibraryImage})`,
      }} >

      {/* FOR OVERLAY */}
      <Box className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"></Box>
      <Box className="relative z-10 text-white h-auto max-w-[800px]">
        <Typography  variant="h6">Welcome to [Your System Name], where managing your library is made easier and more efficient. Our system offers key advantages such as seamless book cataloging, real-time loan tracking, streamlined user management, and simplified inventory control. With a user-friendly interface and automated processes, [Your System Name] ensures improved organization, faster operations, and enhanced accessibility for both library staff and patrons</Typography>
      </Box>

    </Box>
  );
};

export default HeroSection;
