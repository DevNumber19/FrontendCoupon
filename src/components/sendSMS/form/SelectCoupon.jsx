import React from 'react'

import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { Controller } from 'react-hook-form'

const SelectCoupon = ({ control, categories, setCategories }) => {
  return (
    <Controller
      render={({ field }) => (
        <Select
          {...field}
          size="small"
          style={{ marginBottom: '10px', width: '100%' }}
          value={categories}
          defaultValue={categories}
          label="Coupon*"
          onChange={(e) => setCategories(e.target.value)}
        >
          <MenuItem value={'BarBQ Plaza'}>BarBQ Plaza</MenuItem>
          <MenuItem value={'EveAndBoy'}>EveAndBoy</MenuItem>
          <MenuItem value={'Starbucks'}>Starbucks</MenuItem>
          <MenuItem value={'Swensens'}>Swensens</MenuItem>
        </Select>
      )}
      name="select"
      control={control}
      rules={{ required: 'category required..' }}
    />
  )
}

export default SelectCoupon
