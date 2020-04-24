import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon2(props) {
  return ( 
    <MaterialIcons
      name={props.name}
      size={24}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
