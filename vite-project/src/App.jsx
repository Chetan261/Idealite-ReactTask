import React, { useState } from 'react';
import { Box, Tabs, Tab, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import ClaimsOptionCard from './components/ClaimsOptionCard';
import defaultOptions from './data/defaultOptions.json';

function getNewOption(idx) {
  return {
    label: `Option ${idx + 1}`,
    familyDefinition: "EMP",
    employees: "",
    dependents: "",
    totalLives: "",
    sumInsured: 200000,
    sumInsuredOption: "option",
    comments: "",
  };
}

export default function App() {
  const [options, setOptions] = useState(defaultOptions);
  const [selected, setSelected] = useState(0);

  const handleOptionChange = (idx, updated) => {
    setOptions(opts => opts.map((opt, i) => i === idx ? updated : opt));
  };

  const handleClone = (idx) => {
    setOptions(opts => [
      ...opts.slice(0, idx + 1),
      { ...opts[idx], label: `Option ${opts.length + 1}` },
      ...opts.slice(idx + 1),
    ]);
    setSelected(idx + 1);
  };

  const handleDelete = (idx) => {
    if (options.length > 1) {
      setOptions(opts => opts.filter((_, i) => i !== idx));
      setSelected(prev => prev === idx ? 0 : prev > idx ? prev - 1 : prev);
    }
  };

  return (
    <Box p={3}>
      <Box mb={3}>
        <Box fontWeight="bold" fontSize={22} mb={2}>Claims Information</Box>
        <Box display="flex" alignItems="center" sx={{ bgcolor: "#eaf1ff", borderRadius: 2, p: 1 }}>
          <Box mr={2} fontWeight={600} fontSize={16}>Coverage</Box>
          <Tabs
            value={selected}
            onChange={(_, val) => setSelected(val)}
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{ minHeight: 42 }}
          >
            {options.map((opt, idx) => (
              <Tab
                key={opt.label + idx}
                label={
                  <Box display="flex" alignItems="center">
                    <span>{opt.label}</span>
                    <IconButton size="small" sx={{ ml: 1 }} onClick={e => { e.stopPropagation(); handleClone(idx); }}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    {options.length > 1 && opt.label !== "Expiring Terms" && (
                      <IconButton size="small" onClick={e => { e.stopPropagation(); handleDelete(idx); }}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                }
                sx={{
                  bgcolor: selected === idx ? "#207cff" : "#fff",
                  color: selected === idx ? "#fff" : "#207cff",
                  fontWeight: 700,
                  borderRadius: "10px 10px 0 0",
                  minWidth: 140,
                  mx: 0.5,
                  px: 2,
                  minHeight: 42,
                  textTransform: "none",
                  '&.Mui-selected': {
                    color: '#fff'
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      
      <Box>
        <ClaimsOptionCard
          option={options[selected]}
          onClone={() => handleClone(selected)}
          onDelete={() => handleDelete(selected)}
          onChange={up => handleOptionChange(selected, up)}
          showDelete={options.length > 1 && options[selected].label !== 'Expiring Terms'}
        />
      </Box>
    </Box>
  );
}
