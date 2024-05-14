import React, { useEffect, useRef, useState } from "react"

import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { isAndroid } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { AppointmentSchedulerRoute, RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Snackbar, TextInput } from "react-native-paper"
import { KeyboardAvoidingView, ScrollView, View } from "react-native"
import { DatePickerField, Header, InputField } from "/components"
import { DATE_FORMAT, DEFAULT_APPOINTMENT_CREATE_REQUEST } from "/common"
import moment from "moment"
import { AppointmentCreateRequest } from "/apis/appointment/types"
import { AppointmentCreateFields } from "./types"
import { appointmentCreate } from "/apis/appointment"
import { validateParams } from "/utils/utils"

const AppointmentScheduler = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<AppointmentSchedulerRoute>()
  const employeeId = route.params.employee_id

  const initParams: AppointmentCreateRequest = {
    ...DEFAULT_APPOINTMENT_CREATE_REQUEST,
    employee_id: employeeId,
  }
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(moment().toDate())
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(moment().toDate())
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false)
  const [createParams, setCreateParams] = useState<AppointmentCreateRequest>(initParams)
  const [isDisableCreate, setIsDisableCreate] = useState<boolean>(true)
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")
  const dateTimePickerMode = useRef<"date" | "time">("date")
  const isStart = useRef<boolean>(true)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const paramsValidated = validateParams(createParams)
    setIsDisableCreate(!paramsValidated)
  }, [createParams])

  const performGoBack = () => {
    navigator.goBack()
  }

  const performShowDatePicker = (isStartField: boolean, mode: "date" | "time") => {
    dateTimePickerMode.current = mode
    isStart.current = isStartField
    setIsShowDatePicker(true)
  }
  const performHideDatePicker = () => {
    setIsShowDatePicker(false)
  }

  const onChangeDate = (date: Date) => {
    if (date) {
      if (isStart.current) {
        const changedDate = moment(date).valueOf() < moment().valueOf() ? moment().toDate() : date
        setSelectedStartDate(changedDate)
        const isEndateValid = moment(selectedEndDate).valueOf() < moment(changedDate).valueOf()
        if (isEndateValid) {
          setSelectedEndDate(changedDate)
        }
      } else {
        const changedDate =
          moment(date).valueOf() < moment(selectedStartDate).valueOf() ? moment(selectedStartDate).toDate() : date
        setSelectedEndDate(changedDate)
      }
    }
    performHideDatePicker()
  }

  const performCreateDelivery = async () => {
    setIsDisableCreate(true)
    try {
      const finalCreateParams: AppointmentCreateRequest = {
        ...createParams,
        start_time: moment(selectedStartDate).format(DATE_FORMAT),
        end_time: moment(selectedEndDate).format(DATE_FORMAT),
      }
      await appointmentCreate(finalCreateParams)
      setSnackBarMessage("Tạo lịch hẹn thành công")
      setCreateParams(initParams)
    } catch (error) {
      setSnackBarMessage("Tạo lịch hẹn thất bại")
    }

    setIsShowSnackBar(true)
  }
  const createField = (label: string, placeholder: string, fieldKey: keyof AppointmentCreateRequest) => ({
    fieldKey,
    label,
    placeholder,
    onChangeText: (text: string) => setCreateParams({ ...createParams, [fieldKey]: text }),
  })

  const listFieds: Array<AppointmentCreateFields> = [
    createField("Họ tên", "Nhập họ tên", "name"),
    createField("Số điện thoại", "Nhập số điện thoại", "phone"),
    createField("Email", "Nhập email", "email"),
    createField("Số CMND/Passport", "Nhập Số CMND", "identification"),
  ]

  const renderFieldItem = (item: AppointmentCreateFields, index: number) => {
    const errorMessage = "Không được để trống"
    const inputMode = item.fieldKey === "phone" ? "tel" : item.fieldKey === "email" ? "email" : undefined

    return (
      <InputField
        key={index}
        inputFieldStyle="outlined"
        placeholder={item.placeholder}
        label={item.label}
        isRequire={true}
        inputMode={inputMode}
        maxLength={255}
        value={createParams[item.fieldKey]}
        onChangeText={item.onChangeText}
        errorMessage={errorMessage}
      />
    )
  }

  const renderListFields = () => {
    return <>{listFieds.map(renderFieldItem)}</>
  }

  const onChangeReason = (text: string) => {
    setCreateParams({ ...createParams, reason: text })
  }

  const onReasonForcus = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 200)
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <KeyboardAvoidingView behavior={!isAndroid ? "padding" : "height"} style={styles.container}>
        <Header backAction={performGoBack} label="Đặt lịch hẹn" />
        <ScrollView ref={scrollViewRef}>
          <View style={styles.contentContainer}>
            {renderListFields()}
            <View style={styles.dateSelectorContainer}>
              <DatePickerField
                label="Ngày bắt đầu"
                performShowDatePicker={() => performShowDatePicker(true, "date")}
                selectedDate={selectedStartDate}
                format="DD/MM/YYYY"
                style={styles.dateSelectorView}
                right={<TextInput.Icon icon="calendar-month-outline" />}
              />
              <DatePickerField
                label="Giờ bắt đầu"
                performShowDatePicker={() => performShowDatePicker(true, "time")}
                selectedDate={selectedStartDate}
                format="HH:mm"
                style={styles.timeSelectorView}
                right={<TextInput.Icon icon="clock-outline" />}
              />
            </View>
            <View style={styles.dateSelectorContainer}>
              <DatePickerField
                label="Ngày kết thúc"
                performShowDatePicker={() => performShowDatePicker(false, "date")}
                selectedDate={selectedEndDate}
                format="DD/MM/YYYY"
                style={styles.dateSelectorView}
                right={<TextInput.Icon icon="calendar-month-outline" />}
              />
              <DatePickerField
                label="Giờ kết thúc"
                performShowDatePicker={() => performShowDatePicker(false, "time")}
                selectedDate={selectedEndDate}
                format="HH:mm"
                style={styles.timeSelectorView}
                right={<TextInput.Icon icon="clock-outline" />}
              />
            </View>
            <InputField
              inputFieldStyle="outlined"
              placeholder={"Nhập lý do"}
              label={"Lý do đặt lịch hẹn"}
              isRequire={true}
              maxLength={255}
              value={createParams.reason}
              onChangeText={onChangeReason}
              errorMessage={"Không được để trống"}
              multiline={true}
              onFocus={onReasonForcus}
              style={{ maxHeight: 150 }}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <Button
            style={[styles.buttonStyle, { marginRight: 15 }]}
            contentStyle={styles.buttonContentStyle}
            mode="outlined"
            onPress={performGoBack}
          >
            Trở lại
          </Button>
          <Button
            style={styles.buttonStyle}
            contentStyle={styles.buttonContentStyle}
            mode="contained"
            disabled={isDisableCreate}
            onPress={performCreateDelivery}
          >
            Tạo lịch hẹn
          </Button>
        </View>
        <DateTimePickerModal
          isVisible={isShowDatePicker}
          mode={dateTimePickerMode.current}
          display="spinner"
          onConfirm={onChangeDate}
          onCancel={performHideDatePicker}
          date={moment().toDate()}
          minimumDate={moment().toDate()}
        />

        <Snackbar visible={isShowSnackBar} onDismiss={() => setIsShowSnackBar(false)} duration={2000}>
          {snackBarMessage}
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AppointmentScheduler
