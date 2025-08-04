import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const FAMILIES = ['EMP', 'ESC', 'ESCP/I', 'Specify'];

const FamilyDefinitionSelector = ({ value, onChange }) => (
  <ToggleButtonGroup
    color="primary"
    exclusive
    value={value}
    onChange={(e, val) => val && onChange(val)}
    size="small"
    sx={{ my: 1 }}
  >
    {FAMILIES.map(f => (
      <ToggleButton key={f} value={f}>{f}</ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default FamilyDefinitionSelector;
