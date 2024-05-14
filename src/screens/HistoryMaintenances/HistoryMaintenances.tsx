import React, { useEffect, useMemo, useState } from "react"
import { Header, HistoryItem, SearchField, SizedBox } from "/components"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, ListRenderItemInfo, View } from "react-native"
import Routes from "/navigators/Routes"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HistoryMaintenancesRoute, RootStackParamList } from "/navigators/types"
import { getListAssetMaintenanceByAssetId } from "/apis/assets"
import { GetListAssetMaintenanceByAssetIdResponse } from "/apis/assets/types"
import { log } from "/utils"
import _ from "lodash"
import { PER_PAGE } from "/common"

const HistoryMaintenances = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<HistoryMaintenancesRoute>()
  const asset_id = route?.params?.asset_id ?? ""
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>("")
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [historyData, setHistoryData] = useState<Array<GetListAssetMaintenanceByAssetIdResponse>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isEndOfLoadMore, setIsEndOfLoadMore] = useState<boolean>(false)

  useEffect(() => {
    getHistory()
  }, [])

  const pullToRefresh = async () => {
    try {
      if (isLoading || isRefreshing) {
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
        log("stopped")

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
      const data = await getListAssetMaintenanceByAssetId({ asset_id, page: currentPage, per_page: PER_PAGE })
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

  const renderHistoryItem = ({ item, index }: ListRenderItemInfo<GetListAssetMaintenanceByAssetIdResponse>) => {
    return (
      <>
        <HistoryItem
          key={index}
          label={item?.created_by}
          date={item?.created_date}
          children={undefined}
          onPress={() => navigator.navigate(Routes.MAINTENANCE_DETAIL, { id: item?.id })}
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
      <Header backAction={performGoBack} label="Lịch sử sửa chữa" />
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
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        style={styles.buttonStyle}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        onPress={performGoBack}
      >
        Trở lại
      </Button>
    </SafeAreaView>
  )
}

export default HistoryMaintenances
