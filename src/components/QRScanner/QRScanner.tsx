import React, { useState } from "react"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { height, log, width } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Icon, IconButton, MD3Colors, Portal, Text } from "react-native-paper"
import { Image, View } from "react-native"
import { CORNER_BOTTOM_LEFT, CORNER_BOTTOM_RIGHT, CORNER_TOP_LEFT, CORNER_TOP_RIGHT } from "/assets/images"
import { QRScannerProps } from "./types"
import LottieView from "lottie-react-native"
import { QR_SCANNER } from "/assets/lotties"
import { SizedBox } from "../SizedBox"

const QRScanner = (props: QRScannerProps) => {
  const { onPress, torchOnPress, launcherLibrary } = props
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isTorch, setIsTorch] = useState<boolean>(false)

  const handleTorch = () => {
    setIsTorch(!isTorch)
    torchOnPress()
  }

  return (
    <Portal>
      <View style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text variant="headlineSmall" style={styles.labelHint}>
            Hướng máy ảnh vào mã QR
          </Text>
        </View>
        <IconButton
          icon="close"
          iconColor={MD3Colors.secondary99}
          size={40}
          onPress={onPress}
          style={styles.iconButton}
        />
        <View style={styles.container}>
          <View style={styles.middleContainer}>
            <View style={styles.topConnerContainer}>
              <Image source={CORNER_TOP_LEFT} style={[styles.connerStyle, { top: -10, left: 22 }]} />
              <Image source={CORNER_TOP_RIGHT} style={[styles.connerStyle, { top: -10, right: 22 }]} />
            </View>
            <View style={styles.backgroundLeft} />
            <View style={styles.squareScanner}>
              <View style={[styles.squareScanner, styles.styleSquareBehind]}>
                <LottieView source={QR_SCANNER} autoPlay loop style={styles.lottieStyle} duration={4000} />
              </View>
            </View>
            <View style={styles.backgroundRight} />
            <View style={styles.bottomConnerContainer}>
              <Image source={CORNER_BOTTOM_LEFT} style={[styles.connerStyle, { bottom: -10, left: 22 }]} />
              <Image source={CORNER_BOTTOM_RIGHT} style={[styles.connerStyle, { bottom: -10, right: 22 }]} />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <IconButton
            icon={isTorch ? "flash-outline" : "flash-off"}
            iconColor={MD3Colors.secondary0}
            size={30}
            onPress={handleTorch}
            mode="contained"
          />
          <Button icon="image-multiple-outline" mode="text" onPress={launcherLibrary}>
            Chọn ảnh từ thư viện
          </Button>
          <SizedBox height={1} />
        </View>
      </View>
    </Portal>
  )
}

export default QRScanner
