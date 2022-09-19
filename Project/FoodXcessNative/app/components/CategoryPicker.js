import React from 'react';
import {Picker} from '@react-native-picker/picker';

import colors from '../config/colors';

function CategoryPicker({category, setCategory}) {
    return (
        <Picker selectedValue={category} onValueChange={(itemValue, itemIndex) => 
                setCategory(itemValue)
            }
            style={{width:150, height: 30, backgroundColor: colors.sand, fontSize: 5}}
            dropdownIconColor={colors.lightGreen}
        >
            <Picker.Item label='Category' value={null}/>
            <Picker.Item label='Fruits' value='Fruits'/>
            <Picker.Item label='Vegetables' value='Vegetables'/>
            <Picker.Item label='Meat' value='Meat'/>
            <Picker.Item label='Seafood' value='Seafood'/>
            <Picker.Item label='Cold cuts' value='Cold cuts'/>
            <Picker.Item label='Dairy' value='Dairy'/>
            <Picker.Item label='Bread' value='Bread'/>
            <Picker.Item label='Cake & biscuits' value='Cake & biscuits'/>
            <Picker.Item label='Alcoholic beverages' value='Alcoholic beverages'/>
            <Picker.Item label='Beverages' value='Beverages'/>
            <Picker.Item label='Coffee & tea' value='Coffee & tea'/>
            <Picker.Item label='Snacks' value='Snacks'/>
            <Picker.Item label='Condiments & dips' value='Condiments & dips'/>
            <Picker.Item label='Dry goods' value='Dry goods'/>
            <Picker.Item label='Nuts & seeds' value='Nuts & seeds'/>
            <Picker.Item label='Canned food' value='Canned food'/>
            <Picker.Item label='Cereals' value='Cereals'/>
            <Picker.Item label='Leftovers' value='Leftovers'/>
            <Picker.Item label='Easy meals' value='Easy meals'/>
            <Picker.Item label='Baking goods' value='Baking goods'/>
            <Picker.Item label='Other goods' value='Other goods'/>
        </Picker>
    );
}

export default CategoryPicker;