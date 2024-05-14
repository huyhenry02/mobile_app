import React, { useState } from "react"
import { NativeSyntheticEvent, TextInputFocusEventData, View } from "react-native"

import { HelperText, TextInput } from "react-native-paper"
import { InputFieldTypes } from "./types"
import { COLORS } from "/common/colors"
import styles from "./styles"
import { isOnlyWhiteSpace } from "/utils/utils"

const InputField = (props: InputFieldTypes) => {
  const {
    iconName,
    isPassword,
    inputFieldStyle,
    isRequire,
    label,
    errorMessage,
    onBlur,
    value,
    secureTextEntry,
    right,
    ...rest
  } = props
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowError, setIsShowError] = useState<boolean>(false)

  const isFlatStyle = inputFieldStyle === "flat"

  const performShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const performBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsShowError(!!value === false || isOnlyWhiteSpace(value ?? ""))
    onBlur?.(event)
  }

  return (
    <>
      <TextInput
        {...rest}
        value={value}
        onBlur={performBlur}
        error={isShowError && !value}
        mode={inputFieldStyle}
        label={label}
        secureTextEntry={secureTextEntry && !isShowPassword}
        left={!!iconName && <TextInput.Icon icon={iconName!} disabled={true} />}
        right={
          right
            ? right
            : isPassword && <TextInput.Icon icon={!isShowPassword ? "eye" : "eye-off"} onPress={performShowPassword} />
        }
        placeholderTextColor={isFlatStyle ? COLORS.grayFilledPlaceHolder : COLORS.grayOutlinePlaceHolderText}
      />
      {isRequire && (
        <View style={styles.errorMessageStyle}>
          <HelperText type="error" visible={isShowError && !value} style={styles.errorMessageStyle}>
            {errorMessage}
          </HelperText>
        </View>
      )}
    </>
  )
}

export default InputField
