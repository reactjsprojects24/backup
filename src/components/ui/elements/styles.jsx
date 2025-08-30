import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Buttons Layout Design : Login and Registration 
export const CustomButton = styled(MuiButton)(({ theme }) => ({
    padding: '10px 20px',
    margin: '10px',
    width:'400px',
    height:'50px',
    borderRadius: '8px',
    border: '2px solid #AF1E22',
    fontSize: '16px',
    fontFamily: 'manrope',
    color: '#fff',
    backgroundColor: '#AF1E22',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#cb2d3194',
        borderColor: '#cb2d3194',
        transform: 'scale(1.05)',
    },
}));
// export default CustomButton;

//Buttons Layout Design : Dashboard and Other Layouts
export const SmallButton = styled(MuiButton)(({theme})=>({
    width: '86px',
    height: '30px',
    padding: '6px 18px',
    borderRadius: '100px',
    border: 'none',
    opacity: 1,
    transform: 'rotate(0deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: '\'Inter\', sans-serif',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '19px',
    letterSpacing: '0px',
    verticalAlign: 'middle',
    color: '#fff',
    backgroundColor: '#FF5B00',
    '&:hover': {
        opacity: 0.8, // Add a subtle hover effect
    },
}))

//Buttons Layout Design : 
export const LargeButton = styled(MuiButton)(({theme})=>({
  width: 'auto',
  height: '50px',
  padding: '6px 18px',
  borderRadius: '100px',
  border: 'none',
  opacity: 1,
  transform: 'rotate(0deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontFamily: '\'Inter\', sans-serif',
  fontWeight: 500,
  fontSize: '11px',
  lineHeight: '19px',
  letterSpacing: '0px',
  verticalAlign: 'middle',
  color: '#fff',
  backgroundColor: '#FF5B00',
  '&:hover': {
      opacity: 0.8, // Add a subtle hover effect
  },
}))

// Text Field Layout Design
export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '400px',
    height: '44px',
    paddingTop: '3.14px',
    paddingBottom: '3.14px',
    paddingLeft: '12.57px',
    borderRadius: '3.14px',
    borderTopLeftRadius: '3.14px',
    borderTopRightRadius: '3.14px',
    // border: '0.79px solid #49454F',
    opacity: 1,
    transform: 'rotate(0deg)',
    fontFamily: '\'Body Large/Font\', sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18.86px',
    letterSpacing: '0.39px',
    color: '#49454F',
    // backgroundColor: 'var(--Schemes-On-Surface-Variant, #49454F)',
    '& .MuiInputBase-root': { 
      color: '#49454F',
    },
    '& .MuiInputBase-input': { 
      color: '#49454F',
      height: '2.4375em',
      padding: '0px', 
      paddingTop: '2px', 
      paddingBottom: '2px',
      lineHeight: '1.2',
      boxSizing: 'border-box',
      paddingLeft: '10px',
      '&::placeholder': {
        color: '#49454F',
        fontSize: '14px', 
        lineHeight: '18.86px' ,
        marginLeft: '-10px'
      },
      '&::-webkit-input-placeholder': {  //For Chrome/Safari
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            lineHeight: '18.86px',
            marginLeft: '-10px'
        },
        // '&::-moz-placeholder': { //For Firefox
        //     color: 'rgba(255, 255, 255, 0.6)',
        //     fontSize: '14px',
        //     lineHeight: '
    },
  }));

  // Typography Layout Design
  export const CustomTypography = styled(Typography)(({ theme }) => ({
    width: '400px',
    height: '40px',
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color:'#757575',
    textAlign: 'center', // Use textAlign instead of horigontalAlign
}));
  
 

