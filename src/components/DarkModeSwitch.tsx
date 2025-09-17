import type { FC } from 'react';

import { Switch } from "@mui/material";
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const DarkModeSwitch: FC = () => {

  const { mode, systemMode, setMode } = useColorScheme();
  var actualMode = mode;
  if (mode === "system") {
    actualMode = systemMode;
  }

  return (
    <Switch checked={actualMode === "dark"} icon={<LightModeIcon color="primary"/>} checkedIcon={<DarkModeIcon color="primary"/>}
      onClick={() => {
        if (actualMode === "dark") {
          setMode("light");
        } else {
          setMode("dark");
        }
    }}/>
  );

}