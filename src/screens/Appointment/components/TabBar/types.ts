export interface TabItem {
  label: string
  key: string
}

export interface CustomTabarProps {
  currentIndex: number
  onIndexChange: (index: number) => void
}
