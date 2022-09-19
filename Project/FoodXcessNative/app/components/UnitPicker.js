import React from 'react';
import {Picker} from '@react-native-picker/picker';

import colors from '../config/colors';

function UnitPicker({unit, setUnit}) {
    return (
        <Picker selectedValue={unit} onValueChange={(itemValue, itemIndex) => 
            setUnit(itemValue)
            }
            style={{width:150, height: 30, backgroundColor: colors.sand, fontSize: 5}}
            itemStyle={{fontSize: 5}}
            dropdownIconColor={colors.lightGreen}
        >
            <Picker.Item label='Unit' value={null}/>
            <Picker.Item label='bag(s)' value='bag(s)'/>
            <Picker.Item label='bottle(s)' value='bottle(s)'/>
            <Picker.Item label='bundles(s)' value='bundles(s)'/>
            <Picker.Item label='can(s)' value='can(s)'/>
            <Picker.Item label='cup(s)' value='cup(s)'/>
            <Picker.Item label='glass(es)' value='glass(es)'/>
            <Picker.Item label='jar(s)' value='jar(s)'/>
            <Picker.Item label='package(s)' value='package(s)'/>
            <Picker.Item label='piece(s)' value='piece(s)'/>
            <Picker.Item label='serving(s)' value='serving(s)'/>
        </Picker>
    );
}

export default UnitPicker;