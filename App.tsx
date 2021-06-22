import React from 'react'
import { StyleSheet, Text } from 'react-native'

const App = () => {
  return (
    <>
      <Text style={styles.h1}>Hello</Text>
    </>
  )
}

const styles = StyleSheet.create({
  h1: {
    backgroundColor: '#BEFCE5',
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    padding: 20,
    textAlign: 'center'
  }
})

export default App