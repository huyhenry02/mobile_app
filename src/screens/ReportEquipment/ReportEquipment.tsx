import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native"
import { DatePickerField, Header, InputField, SearchField, SizedBox, Text } from "/components"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { log } from "/utils"
import moment from "moment"
import { Button, Snackbar } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { ReportEquipmentRoute, RootStackParamList } from "/navigators/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ListReportFields } from "./types"
import { createAssetMaintenance } from "/apis/assets"
import { CreateAssetMaintenanceParams } from "/apis/assets/types"
import { DATE_FORMAT, DEFAULT_CREATE_MAINTENANCE_PARAMS } from "/common/common"
import { validateParams } from "/utils/utils"

const ReportEquipment = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const route = useRoute<ReportEquipmentRoute>()
  const asset_id = route?.params?.asset_id
  const initParams = {
    ...DEFAULT_CREATE_MAINTENANCE_PARAMS,
    asset_id,
  }

  const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate())
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [createParams, setCreateParams] = useState<CreateAssetMaintenanceParams>(initParams)
  const [isDisableCreate, setIsDisableCreate] = useState<boolean>(true)
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")

  useEffect(() => {
    const paramsValidated = validateParams(createParams)
    setIsDisableCreate(!paramsValidated)
  }, [createParams])

  const createField = (label: string, placeholder: string, fieldKey: keyof CreateAssetMaintenanceParams) => ({
    fieldKey,
    label,
    placeholder,
    onChangeText: (text: string) => setCreateParams({ ...createParams, [fieldKey]: text }),
  })

  const performGoBack = () => {
    navigator.goBack()
  }

  const performShowDatePicker = () => {
    setIsShowDatePicker(!isShowDatePicker)
  }

  const onChangeDate = (date: Date) => {
    if (date) {
      const changedDate = moment(date).valueOf() < moment().valueOf() ? moment().toDate() : date
      setSelectedDate(changedDate)
    }
    performShowDatePicker()
  }

  const listFieds: Array<ListReportFields> = [
    createField("Người tạo phiếu", "Nhập Họ tên", "created_by"),
    createField("Lý do sửa chữa", "Nhập lý do sửa chữa", "reason"),
    createField(
      "Mô tả hỏng hóc",
      "Nếu hư hỏng do sự cố hay mất thiết bị thì đính kèm biên bản ghi nhận sự cố",
      "description",
    ),
    createField("Nguyên nhân gây hư hỏng", "Nhập nguyên nhân gây hư hỏng", "causal"),
    createField("Đề xuất xử lý", "Nhập đề xuất xử lý", "proposal"),
    createField("Số kiểm soát", "146/TB/2022", "code"),
  ]

  const performCreateMaintenance = async () => {
    setIsDisableCreate(true)
    try {
      const finalCreateParams: CreateAssetMaintenanceParams = {
        ...createParams,
        asset_id,
        created_date: moment(selectedDate).format(DATE_FORMAT),
      }
      await createAssetMaintenance(finalCreateParams)
      setSnackBarMessage("Gửi báo cáo thành công")
      setCreateParams(initParams)
      // performGoBack()
    } catch (error) {
      setSnackBarMessage("Gửi báo cáo thất bại")
    }

    setIsShowSnackBar(true)
  }

  const renderListFields = () => {
    return (
      <>
        {listFieds.map((item, index) => (
          <InputField
            key={index}
            inputFieldStyle="outlined"
            placeholder={item.placeholder}
            label={item.label}
            isRequire={true}
            maxLength={255}
            value={createParams[item.fieldKey]}
            onChangeText={item.onChangeText}
            errorMessage="Không được để trống"
          />
        ))}
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Header backAction={performGoBack} label="Báo cáo hư hỏng/mất thiết bị" />
        <ScrollView>
          <View style={styles.contentContainer}>
            <SizedBox height={20} width={0} />
            <DatePickerField selectedDate={selectedDate} performShowDatePicker={performShowDatePicker} />
            {renderListFields()}
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
            onPress={performCreateMaintenance}
            disabled={isDisableCreate}
          >
            Gửi báo cáo
          </Button>
        </View>
        <DateTimePickerModal
          isVisible={isShowDatePicker}
          mode="datetime"
          display="inline"
          onConfirm={onChangeDate}
          onCancel={performShowDatePicker}
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

export default ReportEquipment
