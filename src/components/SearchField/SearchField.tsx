import React, { useEffect, useMemo, useState } from "react"
import styles from "./styles"
import { ActivityIndicator, Portal, Searchbar, Text } from "react-native-paper"
import { SearchFieldTypes } from "./types"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, ListRenderItemInfo, View } from "react-native"
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { height, width } from "/utils"
import { COLORS } from "/common/colors"
import { AssetSearchDetail, SearchResponse } from "/apis/assets/types"
import { SizedBox } from "../SizedBox"
import { HistoryItem } from "../HistoryItem"
import { searchAsset } from "/apis/assets"
import { PER_PAGE } from "/common"
import _ from "lodash"
import Routes from "/navigators/Routes"
import { RootStackParamList } from "/navigators/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

const SearchField = (props: SearchFieldTypes) => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { style, top, module, moduleParentId, ...rest } = props
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>("")
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [historyData, setHistoryData] = useState<Array<SearchResponse>>([])
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isEndOfLoadMore, setIsEndOfLoadMore] = useState<boolean>(false)
  const widthScale = useSharedValue(width - 40)
  const heightScale = useSharedValue(48)
  const leftSpace = useSharedValue(width)
  const topSpace = useSharedValue(top)
  const padingTop = useSharedValue(0)

  useEffect(() => {
    leftSpace.value = 20
  }, [])

  const onFocus = () => {
    widthScale.value = width
    heightScale.value = height
    topSpace.value = 0
    padingTop.value = top / 2
    leftSpace.value = 0
  }
  const onBlur = () => {
    heightScale.value = 48
    topSpace.value = top
    padingTop.value = 0
    // leftSpace.value = 0
  }

  const animatedStyles = useAnimatedStyle(() => ({
    height: withSpring(heightScale.value, {
      mass: 1,
      damping: 20,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    }),
    width: withSpring(widthScale.value, {
      mass: 1,
      damping: 20,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    }),
    paddingTop: withSpring(padingTop.value, {
      mass: 1,
      damping: 15,
      stiffness: 80,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      reduceMotion: ReduceMotion.System,
    }),
    top: withSpring(topSpace.value, {
      mass: 1,
      damping: 15,
      stiffness: 80,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      reduceMotion: ReduceMotion.System,
    }),
    left: withSpring(leftSpace.value, {
      mass: 1,
      damping: 15,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      reduceMotion: ReduceMotion.System,
    }),
  }))

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
      const data = await searchAsset({
        keyword: searchValue,
        module: module,
        module_parent_id: moduleParentId,
        page: currentPage,
        per_page: PER_PAGE,
      })

      const { asset_delivery_histories, asset_maintenances, assets } = data

      if (data?.length < PER_PAGE) {
        setIsEndOfLoadMore(true)
      }
      setHistoryData(_.unionBy(historyData, data, "id"))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const renderHistoryItem = ({ item, index }: ListRenderItemInfo<AssetSearchDetail>) => {
    return (
      <>
        <HistoryItem
          key={index}
          label={item?.code}
          date={item?.created_at}
          children={undefined}
          onPress={() => navigator.navigate(Routes.MAINTENANCE_DETAIL, { id: item?.id })}
        />
        <SizedBox height={20} />
      </>
    )
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
    <Portal>
      <Animated.View style={[{ backgroundColor: COLORS.white }, animatedStyles]}>
        <Searchbar
          {...rest}
          style={[styles.container, style]}
          textAlignVertical="top"
          inputStyle={styles.inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          value={searchValue}
          onChangeText={setSearchValue}
        />
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
      </Animated.View>
    </Portal>
  )
}

export default SearchField
