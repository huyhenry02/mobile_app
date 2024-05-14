import React from "react"

import styles from "./styles"
import { TouchableOpacity, View } from "react-native"
import { InputField } from "../InputField"
import moment from "moment"
import { DatePickerFieldProps } from "./types"

const DatePickerField = (props: DatePickerFieldProps) => {
  const { performShowDatePicker, selectedDate, label, format, style, right } = props

  return (
    <View style={style}>
      <InputField
        inputFieldStyle="outlined"
        placeholder="DD/MM/YYYY"
        label={label || "Ngày tạo phiếu"}
        isRequire={true}
        maxLength={255}
        value={moment(selectedDate).format(format || "DD/MM/YYYY HH:mm")}
        editable={false}
        style={style}
        right={right}
      />
      <TouchableOpacity style={styles.buttonSelectStyle} onPress={performShowDatePicker} activeOpacity={0.8} />
    </View>
  )
}

export default DatePickerField
