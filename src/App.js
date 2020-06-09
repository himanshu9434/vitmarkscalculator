import React , {useState,useEffect}from 'react';
import validate from "validate.js"
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useSnackbar} from "./snackbar-hook"
import Snackbars from "./snackbar"
import './App.css';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height :"100%",
    width: "100%"
  },
  paperoption : {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height :"100%",

  },
  container : {
    paddingTop : theme.spacing(2)
  },
  input : {
    paddingBottom :theme.spacing(1),
  },
  gridItem : {
    width:"100%"
  },
  header : {
    marginBottom : theme.spacing(2)
  },
  footer : {
    marginTop : theme.spacing(5)
  }
}));
function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState('theory_only');
  const [cat1,setCat1] = useState('')
  const [cat2,setCat2] = useState('')
  const [da1,setDa1] = useState('')
  const [da2,setDa2] = useState('')
  const [da3,setDa3] = useState('')
  const [lab,setLab] = useState('')
  const [sts1,setsts1] = useState('')
  const [sts2,setsts2] = useState('')
  const [sts3,setsts3] = useState('')
  const [sts4,setsts4] = useState('')
  const [additional,setAdditional] = useState('')
  const [totalMarks, setTotalMarks] = useState('')
  const [status, setStatus] = useState('')
  const {open,message,severity,handleSeverity,handleClose,handleMessage,handleOpen} = useSnackbar()


  let constraints = {
    cat1:{
        numericality: {
          greaterThanOrEqualTo: 0,
            lessThanOrEqualTo : 50
          }
    },
    cat2:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 50
        }
  },
    da1:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 10
        }
  },
    da2:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 10
        }
    },
    da3:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 10
        }
    },
    additional:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 10
        }
    },
    lab:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 60
        }
    },
    stsAssessment1:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 30
        }
    },
    stsAssessment2:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 30
        }
    },
    stsAssessment3:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 30
        }
    },
    stsAssessment4:{
      numericality: {
        greaterThanOrEqualTo: 0,
          lessThanOrEqualTo : 30,
        }
    },
    
}

  const handleChange = (event) => {
    setValue(event.target.value);
    setEmpty()
  };

  const addzero  = () => {
    if (cat1===""){
      setCat1(0)
    }
    if (cat2===""){
      setCat2(0)
    }
    if (da1===""){
      setDa1(0)
    }
    if (da2===""){
      setDa2(0)
    }
    if (da3===""){
      setDa3(0)
    }
    if (additional===""){
      setAdditional(0)
    }
    if (lab===""){
      setLab(0)
    }
    if (sts1===""){
      setsts1(0)
    }
    if (sts2===""){
      setsts2(0)
    }
    if (sts3===""){
      setsts3(0)
    }
    if (sts4===""){
      setsts4(0)
    }
  }

  const setEmpty = () => {
    setCat1('')
    setCat2('')
    setDa3('')
    setDa2('')
    setDa1('')
    setAdditional('')
    setLab('')
    setTotalMarks('')
    setStatus('')
    setsts1('')
    setsts2('')
    setsts3('')
    setsts4('')

  }

  let validatorfunc = validate(
      {cat1 : cat1*1, cat2 : cat2*1,da1 : da1*1, da2 : da2*1,da3 : da3*1 , additional : additional *1 ,lab : lab*1,stsAssessment1 : sts1*1,stsAssessment2 : sts2*1,stsAssessment3 : sts3*1,stsAssessment4 : sts4*1},
      constraints,
      {format: "flat"}
      )
  const handleTheoryOnly =  () => {
     addzero()
    if (validatorfunc){
      handleSeverity("error")
      handleMessage(validatorfunc[0])
      handleOpen()
    }
    else {
      let cat1conv = cat1 * (15/50)
      let cat2conv = cat2 * (15/50)
      let internal = cat1conv + cat2conv  + da1*1 + da2*1 + da3*1
      let internalfat = internal * (2/3)
  
        if (internal+additional*1>60){
          internal = 60
      }
      else{
        internal = internal + additional*1
      }
  
      if (Math.ceil(internal + internalfat) > 100){
        setTotalMarks(100)
      }
      else {
        setTotalMarks(Math.ceil(internal + internalfat))
      }
      if (Math.ceil(internal + internalfat)>50){
        setStatus("Pass")
      }
      else {
        setStatus("Fail")
      }
    }

  }
  const handlelab4 = () => {
    addzero()
    if (validatorfunc){
      handleSeverity("error")
      handleMessage(validatorfunc[0])
      handleOpen()
    }
    else {
    let cat1conv = cat1 * (15/50)
    let cat2conv = cat2 * (15/50)
    let internal = cat1conv + cat2conv  + da1*1 + da2*1 + da3*1
    let internalfat = internal * (2/3)
    if (internal+additional*1>60){
        internal = 60
    }
    else{
      internal = internal + additional*1
    }
    let th = 0
    if (Math.ceil(internal + internalfat) > 100){
      th = 100
    }
    else {
      th = Math.ceil(internal + internalfat)
    }

    let total
    let labcomp = lab*1.67
    if (labcomp<50&&th<50){
      setStatus("Lab and Theory Fail")
    }
    else if(th<50){
      setStatus("Theory Fail")
    }
    else if(labcomp<50){
      setStatus("Lab Fail")
    }
    else{
      setStatus("pass")
    }
    total = (th*0.75) + (labcomp*0.25)
    
    if (Math.ceil(total) > 100){
      setTotalMarks(100)
    }
    else {
      setTotalMarks(Math.ceil(total))
    }

  }
}

  const handlelab3 = () => {
    addzero()
    if (validatorfunc){
      handleSeverity("error")
      handleMessage(validatorfunc[0])
      handleOpen()
    }
    else {
    let cat1conv = cat1 * (15/50)
    let cat2conv = cat2 * (15/50)
    let internal = cat1conv + cat2conv  + da1*1 + da2*1 + da3*1
    let internalfat = internal * (2/3)
    if (internal+additional*1>60){
        internal = 60
    }
    else{
      internal = internal + additional*1
    }
    let th = 0
    if (Math.ceil(internal + internalfat) > 100){
      th = 100
    }
    else {
      th = Math.ceil(internal + internalfat)
    }

    let total
    let labcomp = lab*1.67
    if (labcomp<50&&th<50){
      setStatus("Lab and Theory Fail")
    }
    else if(th<50){
      setStatus("Theory Fail")
    }
    else if(labcomp<50){
      setStatus("Lab Fail")
    }
    else{
      setStatus("pass")
    }
    total = (th*(2/3)) + (labcomp*(1/3))
    
    if (Math.ceil(total) > 100){
      setTotalMarks(100)
    }
    else {
      setTotalMarks(Math.ceil(total))
    }
  }

  }

  const handlelab2 = () => {
    addzero()
    if (validatorfunc){
      handleSeverity("error")
      handleMessage(validatorfunc[0])
      handleOpen()
    }
    else {
    let cat1conv = cat1 * (15/50)
    let cat2conv = cat2 * (15/50)
    let internal = cat1conv + cat2conv  + da1*1 + da2*1 + da3*1
    let internalfat = internal * (2/3)
    if (internal+additional*1>60){
        internal = 60
    }
    else{
      internal = internal + additional*1
    }
    let th = 0
    if (Math.ceil(internal + internalfat) > 100){
      th = 100
    }
    else {
      th = Math.ceil(internal + internalfat)
    }

    let total
    let labcomp = lab*1.67
    if (labcomp<50&&th<50){
      setStatus("Lab and Theory Fail")
    }
    else if(th<50){
      setStatus("Theory Fail")
    }
    else if(labcomp<50){
      setStatus("Lab Fail")
    }
    else{
      setStatus("pass")
    }

    total = (th*50) + (labcomp*50)
    
    if (Math.ceil(total) > 100){
      setTotalMarks(100)
    }
    else {
      setTotalMarks(Math.ceil(total))
    }
  }

  }

  const handlests = () => {
    addzero()
    if (validatorfunc){
      handleSeverity("error")
      handleMessage(validatorfunc[0])
      handleOpen()
    }
    else {
    let cat1conv = sts1 * (15/30)
    let cat2conv = sts2 * (15/30)
    let da1conv = sts3 * (15/30)
    let da2conv = sts4 * (15/30)
    let internal = cat1conv + cat2conv  + da1conv+ da2conv
    if (Math.ceil(internal*1.67) > 100){
      setTotalMarks(100)
    }
    
    else {
      setTotalMarks(Math.ceil(internal*1.67))
    }
    if(internal*1.67>50)
    {
      setStatus("Pass")
    }
    else
      setStatus("Fail")

    }
    console.log(sts2)
  }




let item
switch (value) {
  case 'theory_only': {
    item =<Paper className={classes.paper}  elevation = {2}>
      <Grid container  spacing={1}>
            <Grid item xs = {12} sm={6}>
            <TextField
              
              id="outlined-required"
              label="Enter Cat 1 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat1}
              onChange = {(event)=>setCat1((event.target.value))}
              variant="outlined"
              className = {classes.input}      
                /></Grid>
              <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter Cat 2 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat2}
              onChange = {(event)=>setCat2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
               <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz1 Marks"
              
              fullWidth
              value = {da1}
              onChange = {(event)=>setDa1((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz2 Marks"
              fullWidth
              value = {da2}
              onChange = {(event)=>setDa2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz3 Marks"
              fullWidth
              value = {da3}
              onChange = {(event)=>setDa3((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                  <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter Additional Marks"
              fullWidth
              value = {additional}
              onChange = {(event)=>setAdditional((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                />
                </Grid>
                <Grid item xs = {12}>
              <Button 
                variant="contained" 
                color="secondary" 
                size = "small" 
                fullWidth
                className = {classes.button} 
                onClick = {handleTheoryOnly}
                // disabled = {!(selectOption && input)}
                >
                Calculate
                </Button>
                </Grid>
                </Grid>
          </Paper>
          break
  }

  case 'theory_lab4': {
    item =<Paper className={classes.paper}  elevation = {2}>
      <Grid container spacing={1}>
            <Grid item xs = {12} sm = {6}>
            <TextField
              
              id="outlined-required"
              label="Enter Cat 1 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat1}
              onChange = {(event)=>setCat1((event.target.value))}
              variant="outlined"
              className = {classes.input}      
                /></Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter Cat 2 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat2}
              onChange = {(event)=>setCat2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz1 Marks"
              
              fullWidth
              value = {da1}
              onChange = {(event)=>setDa1((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz2 Marks"
              
              fullWidth
              value = {da2}
              onChange = {(event)=>setDa2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz3 Marks"
              
              value = {da3}
              fullWidth
              onChange = {(event)=>setDa3((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter Additional Marks"
              
              fullWidth
              value = {additional}
              onChange = {(event)=>setAdditional((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                />
                </Grid>
                <Grid item xs = {12} sm = {12}>
                <TextField
              
              id="outlined-required"
              label="Enter Lab Marks"
              helperText="Out of 60"
              fullWidth
              value = {lab}
              onChange = {(event)=>setLab((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm = {12}>
              <Button 
                variant="contained" 
                color="secondary" 
                size = "small" 
                className = {classes.button} 
                fullWidth
                onClick = {handlelab4}
                // disabled = {!(selectOption && input)}
                >
                Calculate
                </Button>
                </Grid>
                </Grid>
          </Paper>
          break
  }

 
   case 'theory_lab3': {
    item =<Paper className={classes.paper}  elevation = {2}>
      <Grid container spacing={1}>
            <Grid item xs = {12} sm = {6}>
            <TextField
              
              id="outlined-required"
              label="Enter Cat 1 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat1}
              onChange = {(event)=>setCat1((event.target.value))}
              variant="outlined"
              className = {classes.input}      
                /></Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter Cat 2 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat2}
              onChange = {(event)=>setCat2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz1 Marks"
              
              fullWidth
              value = {da1}
              onChange = {(event)=>setDa1((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz2 Marks"
              
              fullWidth
              value = {da2}
              onChange = {(event)=>setDa2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz3 Marks"
              
              value = {da3}
              fullWidth
              onChange = {(event)=>setDa3((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter Additional Marks"
              
              fullWidth
              value = {additional}
              onChange = {(event)=>setAdditional((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                />
                </Grid>
                <Grid item xs = {12} sm = {12}>
                <TextField
              
              id="outlined-required"
              label="Enter Lab Marks"
              helperText="Out of 60"
              fullWidth
              value = {lab}
              onChange = {(event)=>setLab((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm = {12}>
              <Button 
                variant="contained" 
                color="secondary" 
                size = "small" 
                className = {classes.button} 
                fullWidth
                onClick = {handlelab3}
                // disabled = {!(selectOption && input)}
                >
                Calculate
                </Button>
                </Grid>
                </Grid>
          </Paper>
          break
  }

  case 'theory_lab2': {
    item =<Paper className={classes.paper}  elevation = {2}>
      <Grid container spacing={1}>
            <Grid item xs = {12} sm = {6}>
            <TextField
              
              id="outlined-required"
              label="Enter Cat 1 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat1}
              onChange = {(event)=>setCat1((event.target.value))}
              variant="outlined"
              className = {classes.input}      
                /></Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter Cat 2 Marks"
              helperText="Out of 50"
              fullWidth
              value = {cat2}
              onChange = {(event)=>setCat2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz1 Marks"
              
              fullWidth
              value = {da1}
              onChange = {(event)=>setDa1((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz2 Marks"
              
              fullWidth
              value = {da2}
              onChange = {(event)=>setDa2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter DA/Quiz3 Marks"
              
              value = {da3}
              fullWidth
              onChange = {(event)=>setDa3((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
              
              id="outlined-required"
              label="Enter Additional Marks"
              
              fullWidth
              value = {additional}
              onChange = {(event)=>setAdditional((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                />
                </Grid>
                <Grid item xs = {12} sm = {12}>
                <TextField
              
              id="outlined-required"
              label="Enter Lab Marks"
              helperText="Out of 60"
              fullWidth
              value = {lab}
              onChange = {(event)=>setLab((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm = {12}>
              <Button 
                variant="contained" 
                color="secondary" 
                size = "small" 
                className = {classes.button} 
                fullWidth
                onClick = {handlelab2}
                // disabled = {!(selectOption && input)}
                >
                Calculate
                </Button>
                </Grid>
                </Grid>
          </Paper>
          break
  }
  case 'sts': {
    item =<Paper className={classes.paper}  elevation = {2}>
      <Grid container spacing ={1}>
            <Grid item xs = {12} sm={6}>
            <TextField
              
              id="outlined-required"
              label="Enter Cat 1 Marks"
              helperText="Out of 30"
              fullWidth
              value = {sts1}
              onChange = {(event)=>setsts1((event.target.value))}
              variant="outlined"
              className = {classes.input}      
                /></Grid>
                <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter Cat 2 Marks"
              helperText="Out of 30"
              fullWidth
              value = {sts2}
              onChange = {(event)=>setsts2((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter Assement1 Marks"
              helperText="Out of 30"
              fullWidth
              value = {sts3}
              onChange = {(event)=>setsts3((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
                <Grid item xs = {12} sm={6}>
                <TextField
              
              id="outlined-required"
              label="Enter Assesment2 Marks"
              helperText="Out of 30"
              fullWidth
              value = {sts4}
              onChange = {(event)=>setsts4((event.target.value))}
              variant="outlined"
              className = {classes.input}
                        
                /></Grid>
              <Grid item xs= {12}>
              <Button 
                variant="contained" 
                color="secondary" 
                size = "small" 
                fullWidth
                className = {classes.button} 
                onClick = {handlests}
                // disabled = {!(selectOption && input)}
                >
                Calculate
                </Button>
                </Grid>
                </Grid>
          </Paper>
          break
  }
  
}

  return (
    <div className="App">
      <Snackbars open={open} message = {message} handleClose={handleClose} severity= {severity} />
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <div className = {classes.header}>
      <Typography variant="h3" display = "inline" color = "secondary">
               Calculate Winter-Sem(2019-20) Marks
              </Typography>
              </div>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item sm={12} md= {4} className={classes.gridItem} >
            <Paper className={classes.paperoption} elevation={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Type of Course</FormLabel>
                <RadioGroup aria-label="marks" name="marks1" value={value} onChange={handleChange}>
                  <FormControlLabel value="theory_only" control={<Radio />} label="Theory Only" />
                  <FormControlLabel value="theory_lab4" control={<Radio />} label="Theory + Lab (4 credits)" />
                  <FormControlLabel value="theory_lab3" control={<Radio />} label="Theory + Lab (3 credits)" />
                  <FormControlLabel value="theory_lab2" control={<Radio />} label="Theory + Lab (2 credits)" />
                  <FormControlLabel value="sts" control={<Radio />} label="Soft Skills" />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item sm={12} md={8}>
            {item}
          </Grid>
          <Grid item container xs={12} className={classes.gridItem}>
            <Paper className = {classes.paper}>
            <Grid container className={classes.gridItem} >
              <Grid item xs= {6}>
            <Typography variant="h5" display = "inline" >
               Total Marks {totalMarks}
              </Typography>
              </Grid>
              <Grid item xs= {6}>
              <Typography variant="h5"  display = "inline" color= "secondary">
               {status}
              </Typography>
              </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div className = {classes.footer}> 
        <Typography variant="h5"  display = "inline" >
              Can't use Project Marks Until they are out :)
              </Typography>
              </div>
      </Container>
    </div>
  );
}

export default App;
