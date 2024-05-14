import React from "react"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Dialog, Portal, Text } from "react-native-paper"
import { AlertDialogProps } from "./types"

const AlertDialog = (props: AlertDialogProps) => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { onDismiss, visible, content, title, children } = props

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Xong</Button>
        </Dialog.Actions>
        {children}
      </Dialog>
    </Portal>
  )
}

export default AlertDialog
