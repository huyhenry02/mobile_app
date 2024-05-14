import React, { useEffect, useMemo, useState } from "react"
import { Header, HistoryItem, SearchField, SizedBox } from "/components"
import { ActivityIndicator, Button, Surface, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, ListRenderItemInfo, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HistoryDeliveryRoute, RootStackParamList } from "/navigators/types"
import Routes from "/navigators/Routes"
import { getListAssetDeliveryHistoryByAssetId } from "/apis/assets"
import { GetListAssetDeliveryHistoryByAssetIdResponse } from "/apis/assets/types"
import { log } from "/utils"
import { DATE_FORMAT, PER_PAGE } from "/common"
import _ from "lodash"
import moment from "moment"

const HistoryDelivery = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<HistoryDeliveryRoute>()
  const asset_id = route?.params?.asset_id ?? ""

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>("")
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isEndOfLoadMore, setIsEndOfLoadMore] = useState<boolean>(false)
  const [historyData, setHistoryData] = useState<Array<GetListAssetDeliveryHistoryByAssetIdResponse>>([])

  useEffect(() => {
    getHistory()
  }, [])

  const pullToRefresh = async () => {
    try {
      if (isLoading || isRefreshing) {
        log("stopped pullToRefresh")

        return
      }
      setHistoryData([])
      setIsRefreshing(true)
      setIsEndOfLoadMore(false)
      setCurrentPage(1)
      await getHistory()
      setIsRefreshing(false)
    } catch (error) {
      setIsRefreshing(false)
    }
  }

  const loadMoreData = async () => {
    try {
      if (isLoading || isEndOfLoadMore) {
        log("stopped loadMoreData")

        return
      }
      setIsLoadingMore(true)
      setCurrentPage(currentPage + 1)
      await getHistory()
      setIsLoadingMore(false)
    } catch (error) {
      setIsLoadingMore(false)
    }
  }

  const getHistory = async () => {
    setIsLoading(true)
    try {
      const data = await getListAssetDeliveryHistoryByAssetId({ asset_id, page: currentPage, per_page: PER_PAGE })
      if (data?.length < PER_PAGE) {
        setIsEndOfLoadMore(true)
      }
      setHistoryData(_.unionBy(historyData, data, "id"))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      log("getDetail error", error)
    }
  }

  const performGoBack = () => {
    navigator.goBack()
  }

  const renderHeaderComponent = () => {
    return (
      <>
        <SizedBox height={20} />
        <Text variant="titleLarge">Thông tin chi tiết</Text>
        <SizedBox height={20} />
      </>
    )
  }

  const renderHistoryItem = ({ item, index }: ListRenderItemInfo<GetListAssetDeliveryHistoryByAssetIdResponse>) => {
    return (
      <>
        <HistoryItem
          key={index}
          label={item?.code}
          date={item?.created_date}
          children={undefined}
          onPress={() => navigator.navigate(Routes.DELIVERY_DETAIL, { id: item?.id })}
        />
        <SizedBox height={20} />
      </>
    )
  }

  const renderEmptyData = () => {
    if (isLoading) {
      return <ActivityIndicator size={"small"} />
    }

    return <Text style={styles.emptyDataText}>Không có dữ liệu</Text>
  }

  const renderFooter = useMemo(() => {
    return <View>{isLoadingMore && <ActivityIndicator size={"small"} />}</View>
  }, [isLoadingMore])

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <Header backAction={performGoBack} label="Lịch sử giao nhận" />
      <SearchField
        // style={styles.searchFieldContainer}
        top={140}
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder="Tìm kiếm số phiếu"
      />
      <SizedBox height={60} />
      <FlatList
        contentContainerStyle={styles.scrollViewContentStyle}
        data={historyData}
        onRefresh={pullToRefresh}
        refreshing={isRefreshing}
        ListHeaderComponent={renderHeaderComponent}
        renderItem={renderHistoryItem}
        ListEmptyComponent={renderEmptyData}
        onEndReached={loadMoreData}
        ListFooterComponent={renderFooter}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <Surface style={styles.surface} elevation={4}> */}
      <Button
        style={styles.buttonStyle}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        onPress={performGoBack}
      >
        Trở lại
      </Button>
      {/* </Surface> */}
    </SafeAreaView>
  )
}

export default HistoryDelivery
