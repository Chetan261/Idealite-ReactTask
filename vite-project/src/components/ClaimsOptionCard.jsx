import React from 'react';
import {
  Card,
  CardContent,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material';

const sectionHeader = {
  bgcolor: "#207cff",
  color: "#fff",
  borderRadius: 2,
  fontWeight: 600,
  px: 2,
  py: 0.5,
  fontSize: 15,
  mb: 1.2,
  mt: 1.8
};

const FamilyOptions = ['EMP', 'ESC', 'ESCP/I', 'Specify'];
const SumInsuredOptions = [100000, 200000, 300000, 400000, 500000, 750000];

export default function ClaimsOptionCard({
  option,
  onChange
}) {
  // Family Definition change function
  const handleFamilyChange = (_e, val) => {
    if (val) onChange({ ...option, familyDefinition: val });
  };

  // employees, dependents and update totalLives
  const handleField = field => e => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); 

    const employees = field === 'employees' ? value : option.employees || '';
    const dependents = field === 'dependents' ? value : option.dependents || '';
    const totalLives = (parseInt(employees, 10) || 0) + (parseInt(dependents, 10) || 0);

    onChange({
      ...option,
      [field]: value,
      totalLives: totalLives.toString()
    });
  };

  // Sum Insured radio change handler function
  const handleSumInsuredChange = e => {
    const val = e.target.value;
    onChange({
      ...option,
      selectedSumInsured: val,
      sumInsuredOption: val === 'manual' ? 'manual' : 'option',
      sumInsured: val === 'manual' ? option.sumInsured : Number(val)
    });
  };

  // sum insured input handler function
  const handleManualSumInsured = e => {
    onChange({
      ...option,
      sumInsuredOption: 'manual',
      sumInsured: e.target.value === '' ? '' : Number(e.target.value),
      selectedSumInsured: 'manual'
    });
  };

  return (
    <Card elevation={3} sx={{ width: 340, minWidth: 320, mx: 1 }}>
      <CardContent>


        {/* Family Definition */}
        <Box sx={sectionHeader}>Family Definition</Box>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={option.familyDefinition}
          onChange={handleFamilyChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          {FamilyOptions.map(f => (
            <ToggleButton key={f} value={f} sx={{ flex: 1, fontWeight: 500, fontSize: 15 }}>
              {f}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Breakup of Lives */}
        <Box sx={sectionHeader}>Breakup of Lives</Box>
        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <TextField
            label="No. of Employees"
            type="number"
            size="small"
            value={option.employees}
            onChange={handleField('employees')}
          />
          <TextField
            label="No. of Dependents"
            type="number"
            size="small"
            value={option.dependents}
            onChange={handleField('dependents')}
          />
          <TextField
            label="Total Lives"
            type="number"
            size="small"
            value={
              option.totalLives !== undefined && option.totalLives !== ""
                ? option.totalLives
                : ((Number(option.employees) || 0) + (Number(option.dependents) || 0))
            }
            disabled
          />
        </Box>

        {/* Sum Insured */}
        <Box sx={sectionHeader}>Sum Insured</Box>
        <RadioGroup
          row
          value={option.selectedSumInsured || ''}
          onChange={handleSumInsuredChange}
        >
          {SumInsuredOptions.map(si => (
            <FormControlLabel
              key={si}
              value={String(si)}
              control={<Radio />}
              label={si.toLocaleString('en-IN')}
            />
          ))}
          <FormControlLabel value="manual" control={<Radio />} label="Enter Sum Insured" />
        </RadioGroup>

        <TextField
          label="Enter Sum Insured"
          type="number"
          size="small"
          fullWidth
          value={option.sumInsuredOption === 'manual' ? option.sumInsured : ''}
          onChange={handleManualSumInsured}
          disabled={option.selectedSumInsured !== 'manual'}
          sx={{ mt: 1, mb: 2 }}
        />

         {/* Comments  */}
        <TextField
          label="Add Comment"
          size="small"
          fullWidth
          value={option.comments}
          onChange={handleField('comments')}
          multiline
          minRows={2}
          sx={{ mb: 2 }}
        />
      </CardContent>
    </Card>
  );
}
