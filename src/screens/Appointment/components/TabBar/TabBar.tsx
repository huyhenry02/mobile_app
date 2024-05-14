import React, { useEffect, useRef } from "react"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text } from "react-native-paper"
import { NavigationState, SceneRendererProps } from "react-native-tab-view"
import { Animated, FlatList, ListRenderItemInfo, TouchableOpacity, View } from "react-native"
import { keyExtractor } from "/utils/utils"
import { isNumber } from "lodash"
import { CustomTabarProps } from "./types"

const TabBar = (props: SceneRendererProps & { navigationState: NavigationState<any> } & CustomTabarProps) => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { navigationState, position, currentIndex, onIndexChange } = props
  const inputRange = navigationState.routes.map((x, i) => i)
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (isNumber(currentIndex) && currentIndex < inputRange.length) {
      flatListRef?.current?.scrollToIndex({ animated: true, index: currentIndex, viewOffset: 50 })
    }
  }, [currentIndex])

  const _onIndexChange = (index: number) => {
    onIndexChange(index)
    flatListRef?.current?.scrollToIndex({ animated: true, index: index, viewOffset: 50 })
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<any>) => {
    const isActived = currentIndex === index

    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((inputIndex) => (inputIndex === index ? 1 : 0.5)),
    })

    return (
      <Animated.View style={{ opacity }}>
        <Button
          mode={isActived ? "contained" : "text"}
          rippleColor={"transparent"}
          onPress={() => _onIndexChange(index)}
          style={styles.buttonContainerStyle}
        >
          {item.title}
        </Button>
      </Animated.View>
    )
  }

  return (
    <FlatList
      ref={flatListRef}
      data={navigationState.routes}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.container}
    />
  )
}

export default TabBar
