import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native"
import { DatePickerField, Header, InputField, SearchField, SizedBox } from "/components"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import { Button, Snackbar } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { CreateDeliveryNoteRoute, RootStackParamList } from "/navigators/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ListCreateDeliveryNodeFields } from "./types"
import { CreateAssetDeliveryHistoryParams } from "/apis/assets/types"
import { DATE_FORMAT, DEFAULT_CREATE_DELIVERY_PARAMS } from "/common/common"
import { validateParams } from "/utils/utils"
import { createAssetDeliveryHistory } from "/apis/assets"

const CreateDeliveryNote = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<CreateDeliveryNoteRoute>()
  const { asset_id, name } = route?.params ?? { asset_id: "", name: "" }
  const initParams = {
    ...DEFAULT_CREATE_DELIVERY_PARAMS,
    name,
    asset_id,
  }
  const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate())
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false)
  const [createParams, setCreateParams] = useState<CreateAssetDeliveryHistoryParams>(initParams)
  const [searchValue, setSearchValue] = useState<string>("")
  const [isDisableCreate, setIsDisableCreate] = useState<boolean>(true)
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")

  useEffect(() => {
    const paramsValidated = validateParams(createParams)
    setIsDisableCreate(!paramsValidated)
  }, [createParams])

  const createField = (label: string, placeholder: string, fieldKey: keyof CreateAssetDeliveryHistoryParams) => ({
    fieldKey,
    label,
    placeholder,
    onChangeText: (text: string) => setCreateParams({ ...createParams, [fieldKey]: text }),
  })

  const listFieds: Array<ListCreateDeliveryNodeFields> = [
    createField("Nơi nhận", "Nhập nơi nhận", "receiver"),
    createField("Đơn vị giao", "Nhập số điện thoại", "deliver"),
    createField("Lí do giao nhận", "Theo PGV số...", "reason"),
    createField("Địa điểm sử dụng", "Nhập địa điểm sử dụng", "place_of_use"),
    createField("Tài liệu kèm theo", "Tài liệu kí thuật...", "attachments"),
    createField("Số kiểm soát", "146/TB/2022", "code"),
  ]

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

  const performCreateDelivery = async () => {
    setIsDisableCreate(true)
    try {
      const finalCreateParams: CreateAssetDeliveryHistoryParams = {
        ...createParams,
        asset_id,
        created_date: moment(selectedDate).format(DATE_FORMAT),
        name: name,
      }
      await createAssetDeliveryHistory(finalCreateParams)
      setSnackBarMessage("Tạo phiếu giao nhận thành công")
      setCreateParams(initParams)
      // performGoBack()
    } catch (error) {
      setSnackBarMessage("Tạo phiếu giao nhận thất bại")
    }

    setIsShowSnackBar(true)
  }

  const renderFieldItem = (item: ListCreateDeliveryNodeFields, index: number) => {
    const errorMessage = "Không được để trống"
    // const inputMode = item.fieldKey === "phone" ? "tel" : item.fieldKey === "email" ? "email" : undefined

    return (
      <InputField
        key={index}
        inputFieldStyle="outlined"
        placeholder={item.placeholder}
        label={item.label}
        isRequire={true}
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

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Header backAction={performGoBack} label="Tạo phiếu giao nhận" />
        <ScrollView>
          <View style={styles.contentContainer}>
            <SizedBox height={20} width={0} />
            <SearchField value={searchValue} onChangeText={setSearchValue} placeholder="Tìm kiếm số phiếu" />
            <SizedBox height={20} width={0} />
            <DatePickerField performShowDatePicker={performShowDatePicker} selectedDate={selectedDate} />
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
            disabled={isDisableCreate}
            onPress={performCreateDelivery}
          >
            Tạo phiếu
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

export default CreateDeliveryNote
